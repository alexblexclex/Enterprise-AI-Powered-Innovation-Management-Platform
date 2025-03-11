import { Link } from "@remix-run/react";
import TenantSwitcher from "./TenantSwitcher";

interface SidebarProps {
  activeRoute?: string;
  currentTenant?: {
    id: string;
    name: string;
    slug: string;
  };
  tenants?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  isReseller?: boolean;
}

export default function Sidebar({ 
  activeRoute, 
  currentTenant = { id: "1", name: "Acme Corp", slug: "acme" },
  tenants = [],
  isReseller = false
}: SidebarProps) {
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Ideas", href: "/ideas", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
    { name: "Board", href: "/board", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { name: "Billing", href: "/billing/overview", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  ];

  // Add reseller admin section if user is a reseller
  const resellerNavigation = isReseller ? [
    { name: "Tenant Management", href: "/reseller/tenants", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { name: "Analytics", href: "/reseller/analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  ] : [];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img className="h-8 w-auto" src="/logo-dark.png" alt="IdeaFlow" />
            <span className="ml-2 text-white text-xl font-semibold">IdeaFlow</span>
          </div>
          
          {/* Tenant Switcher */}
          <div className="mt-5 px-2">
            <TenantSwitcher 
              currentTenant={currentTenant} 
              tenants={tenants}
              isReseller={isReseller}
            />
          </div>
          
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = activeRoute === item.href || 
                              (item.href !== "/dashboard" && activeRoute?.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <svg
                    className={`${
                      isActive ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300"
                    } mr-3 flex-shrink-0 h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  {item.name}
                </Link>
              );
            })}
            
            {/* Reseller navigation section */}
            {resellerNavigation.length > 0 && (
              <>
                <div className="pt-4">
                  <div className="px-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Reseller Admin
                    </h3>
                  </div>
                  <div className="mt-2 space-y-1">
                    {resellerNavigation.map((item) => {
                      const isActive = activeRoute === item.href || 
                                      (activeRoute?.startsWith(item.href));
                      
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`${
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                        >
                          <svg
                            className={`${
                              isActive ? "text-gray-300" : "text-gray-400 group-hover:text-gray-300"
                            } mr-3 flex-shrink-0 h-6 w-6`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={item.icon}
                            />
                          </svg>
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
        <div className="flex-shrink-0 flex bg-gray-700 p-4">
          <Link to="/profile" className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <div>
                <div className="inline-block h-9 w-9 rounded-full bg-gray-500 text-white flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                  View profile
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
