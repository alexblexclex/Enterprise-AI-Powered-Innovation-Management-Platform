import { useState } from "react";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { login, createUserSession } from "~/utils/session.server";
import { getTenantBySlug } from "~/utils/tenant.server";
import { db } from "~/utils/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const tenantSlug = formData.get("tenantSlug") as string;
  const redirectTo = formData.get("redirectTo") as string || "/dashboard";

  if (!email || !password || !tenantSlug) {
    return json({ 
      error: "Please provide email, password, and tenant" 
    }, { status: 400 });
  }

  // Validate tenant exists
  const tenant = await getTenantBySlug(tenantSlug);
  if (!tenant) {
    return json({ error: "Invalid tenant" }, { status: 400 });
  }

  // Attempt login
  const user = await login({ email, password, tenantSlug });
  if (!user) {
    return json({ error: "Invalid credentials" }, { status: 400 });
  }

  // Create user session
  return createUserSession(user.id, user.tenantId, redirectTo);
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const actionData = useActionData<typeof action>();
  const [tenantSlug, setTenantSlug] = useState("");
  const [tenants, setTenants] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTenantSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTenantSlug(value);
    
    if (value.length >= 2) {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we're simulating tenant search
        setTimeout(() => {
          setTenants([
            { id: "1", name: "Acme Corp", slug: "acme" },
            { id: "2", name: "Globex", slug: "globex" },
            { id: "3", name: "Initech", slug: "initech" }
          ].filter(t => t.name.toLowerCase().includes(value.toLowerCase()) || 
                        t.slug.toLowerCase().includes(value.toLowerCase())));
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error searching tenants:", error);
        setIsLoading(false);
      }
    } else {
      setTenants([]);
    }
  };

  const selectTenant = (slug: string) => {
    setTenantSlug(slug);
    setTenants([]);
  };

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <img src="/logo-light.png" alt="IdeaFlow Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Sign in to your account</h1>
        
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="tenantSlug" className="block text-sm font-medium text-gray-700">
              Tenant
            </label>
            <div className="mt-1 relative">
              <input
                id="tenantSlug"
                name="tenantSlug"
                type="text"
                required
                autoComplete="organization"
                value={tenantSlug}
                onChange={handleTenantSearch}
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {isLoading && (
                <div className="absolute right-2 top-2">
                  <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
              {tenants.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
                  <ul className="py-1">
                    {tenants.map((tenant) => (
                      <li 
                        key={tenant.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectTenant(tenant.slug)}
                      >
                        <div className="font-medium">{tenant.name}</div>
                        <div className="text-sm text-gray-500">{tenant.slug}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                autoComplete="current-password"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          
          <div>
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700"
            >
              Sign in
            </button>
          </div>
          
          {actionData?.error && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.error}
            </div>
          )}
        </Form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <span>Don't have an account? </span>
          <Link
            className="text-blue-500 underline"
            to={{
              pathname: "/auth/register",
              search: searchParams.toString(),
            }}
          >
            Sign up
          </Link>
        </div>
        
        <div className="mt-2 text-center">
          <Link
            className="text-sm text-blue-500 underline"
            to="/auth/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
