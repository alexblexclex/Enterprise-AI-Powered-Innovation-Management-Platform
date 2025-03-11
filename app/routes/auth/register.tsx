import { useState } from "react";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/utils/db.server";
import { createUserSession } from "~/utils/session.server";
import { createTenant, getTenantBySlug } from "~/utils/tenant.server";
import bcrypt from "bcryptjs";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const companyName = formData.get("companyName") as string;
  const tenantSlug = formData.get("tenantSlug") as string;
  const redirectTo = formData.get("redirectTo") as string || "/dashboard";

  if (!email || !password || !firstName || !lastName || !companyName || !tenantSlug) {
    return json({ 
      error: "All fields are required" 
    }, { status: 400 });
  }

  // Check if tenant slug is available
  const existingTenant = await getTenantBySlug(tenantSlug);
  if (existingTenant) {
    return json({ error: "This tenant slug is already taken" }, { status: 400 });
  }

  // Create new tenant
  const tenant = await createTenant(companyName, tenantSlug);

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user as tenant admin
  const user = await db.user.create({
    data: {
      email,
      password: passwordHash,
      firstName,
      lastName,
      role: "TENANT_ADMIN",
      tenantId: tenant.id,
    },
  });

  // Create user session
  return createUserSession(user.id, tenant.id, redirectTo);
}

export default function Register() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const actionData = useActionData<typeof action>();
  const [companyName, setCompanyName] = useState("");
  const [tenantSlug, setTenantSlug] = useState("");

  // Generate slug from company name
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCompanyName(name);
    
    // Generate slug: lowercase, replace spaces with hyphens, remove special chars
    const slug = name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    
    setTenantSlug(slug);
  };

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <img src="/logo-light.png" alt="IdeaFlow Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Create your account</h1>
        
        <Form method="post" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <div className="mt-1">
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                value={companyName}
                onChange={handleCompanyNameChange}
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tenantSlug" className="block text-sm font-medium text-gray-700">
              Tenant URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-500 bg-gray-50 text-gray-500 text-sm">
                ideaflow.app/
              </span>
              <input
                id="tenantSlug"
                name="tenantSlug"
                type="text"
                required
                value={tenantSlug}
                onChange={(e) => setTenantSlug(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-500 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          
          <div>
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700"
            >
              Create Account
            </button>
          </div>
          
          {actionData?.error && (
            <div className="pt-1 text-red-700" id="error-message">
              {actionData.error}
            </div>
          )}
        </Form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <span>Already have an account? </span>
          <Link
            className="text-blue-500 underline"
            to={{
              pathname: "/auth/login",
              search: searchParams.toString(),
            }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
