import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import MainLayout from "~/components/layout/MainLayout";
import { requireUserId, getUser, isReseller } from "~/utils/session.server";
import { getResellerTenants } from "~/utils/session.server";
import { db } from "~/utils/db.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const user = await getUser(request);
  
  // Check if user is a reseller
  const userIsReseller = await isReseller(userId);
  if (!userIsReseller) {
    throw new Response("Not authorized", { status: 403 });
  }
  
  // Get reseller's tenants
  const tenants = await getResellerTenants(userId);
  
  return json({ user, tenants });
}

export default function ResellerTenants() {
  const { user, tenants } = useLoaderData<typeof loader>();
  
  return (
    <MainLayout title="Tenant Management" activeRoute="/reseller/tenants">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Tenant Management</h1>
          <Link
            to="/reseller/tenants/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Add New Tenant
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {tenants.length === 0 ? (
              <li className="px-6 py-4 text-center text-gray-500">
                No tenants found. Create your first tenant to get started.
              </li>
            ) : (
              tenants.map((tenant) => (
                <li key={tenant.id}>
                  <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{tenant.name}</h3>
                      <p className="text-sm text-gray-500">Slug: {tenant.slug}</p>
                      <p className="text-sm text-gray-500">Created: {new Date(tenant.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-3">
                      <Form method="post" action="/switch-tenant">
                        <input type="hidden" name="tenantId" value={tenant.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Access
                        </button>
                      </Form>
                      <Link
                        to={`/reseller/tenants/${tenant.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
