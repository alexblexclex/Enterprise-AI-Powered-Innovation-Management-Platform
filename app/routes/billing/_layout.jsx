import { Outlet } from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";
import MainLayout from "~/components/layout/MainLayout";
import { requireUserId, getUser, isReseller, getCurrentTenantId } from "~/utils/session.server";
import { getCurrentTenant, getResellerTenants } from "~/utils/tenant.server";

export async function loader({ request }) {
  const userId = await requireUserId(request);
  const user = await getUser(request);
  const tenantId = await getCurrentTenantId(request);
  const currentTenant = await getCurrentTenant(request);
  
  // Check if user is a reseller
  const userIsReseller = await isReseller(userId);
  
  // If user is a reseller, get all tenants they have access to
  const tenants = userIsReseller ? await getResellerTenants(userId) : [];
  
  return json({ 
    user, 
    currentTenant, 
    isReseller: userIsReseller,
    tenants
  });
}

export default function BillingLayout() {
  const { user, currentTenant, isReseller, tenants } = useLoaderData();
  const location = useLocation();
  
  const billingNavigation = [
    { name: "Overview", href: "/billing/overview" },
    { name: "Subscriptions", href: "/billing/subscriptions" },
    { name: "Usage", href: "/billing/usage" },
    { name: "History", href: "/billing/history" },
  ];
  
  return (
    <MainLayout 
      title="Billing & Subscription" 
      activeRoute="/billing"
      currentTenant={currentTenant}
      tenants={tenants}
      isReseller={isReseller}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Billing & Subscription</h1>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {billingNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                      isActive
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
