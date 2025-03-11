import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { db } from "./db.server";

type LoginForm = {
  email: string;
  password: string;
  tenantSlug: string;
};

export async function login({ email, password, tenantSlug }: LoginForm) {
  // Find the tenant
  const tenant = await db.tenant.findUnique({
    where: { slug: tenantSlug },
  });

  if (!tenant) {
    return null;
  }

  // Find the user in the specific tenant
  const user = await db.user.findUnique({
    where: {
      email_tenantId: {
        email,
        tenantId: tenant.id,
      },
    },
  });

  if (!user) {
    return null;
  }

  // Check password
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return null;
  }

  return { id: user.id, email, tenantId: tenant.id, role: user.role };
}

// Check if user is a reseller
export async function isReseller(userId: string) {
  const reseller = await db.reseller.findUnique({
    where: { userId },
  });
  
  return !!reseller;
}

// Get reseller's tenants
export async function getResellerTenants(userId: string) {
  const reseller = await db.reseller.findUnique({
    where: { userId },
    include: { tenants: true },
  });
  
  return reseller?.tenants || [];
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "ideaflow_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function createUserSession(
  userId: string,
  tenantId: string,
  redirectTo: string
) {
  const session = await storage.getSession();
  session.set("userId", userId);
  session.set("tenantId", tenantId);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getCurrentTenantId(request: Request) {
  const session = await getUserSession(request);
  const tenantId = session.get("tenantId");
  if (!tenantId || typeof tenantId !== "string") return null;
  return tenantId;
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/auth/login?${searchParams}`);
  }
  return userId;
}

export async function requireTenantId(request: Request) {
  const tenantId = await getCurrentTenantId(request);
  if (!tenantId) {
    throw redirect("/auth/login");
  }
  return tenantId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, firstName: true, lastName: true, role: true, tenantId: true }
  });

  if (!user) {
    throw await logout(request);
  }

  return user;
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function switchTenant(request: Request, tenantId: string, redirectTo: string = "/dashboard") {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect("/auth/login");
  }

  // Verify user has access to this tenant
  const userInTenant = await db.user.findUnique({
    where: {
      id_tenantId: {
        id: userId,
        tenantId,
      },
    },
  });

  if (!userInTenant) {
    // Check if user is a reseller with access to this tenant
    const reseller = await db.reseller.findUnique({
      where: { userId },
      include: {
        tenants: {
          where: { id: tenantId },
        },
      },
    });

    if (!reseller || reseller.tenants.length === 0) {
      throw new Response("Not authorized", { status: 403 });
    }
  }

  const session = await getUserSession(request);
  session.set("tenantId", tenantId);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
