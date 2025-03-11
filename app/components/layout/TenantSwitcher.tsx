import { useState, useEffect } from "react";
import { Form, useSubmit, useLoaderData } from "@remix-run/react";

interface Tenant {
  id: string;
  name: string;
  slug: string;
}

interface TenantSwitcherProps {
  currentTenant: Tenant;
  tenants: Tenant[];
  isReseller: boolean;
}

export default function TenantSwitcher({ currentTenant, tenants, isReseller }: TenantSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const submit = useSubmit();

  if (!isReseller || tenants.length <= 1) {
    return (
      <div className="px-3 py-2">
        <div className="text-sm font-medium text-gray-300">{currentTenant.name}</div>
      </div>
    );
  }

  const handleTenantSwitch = (tenantId: string) => {
    const formData = new FormData();
    formData.append("tenantId", tenantId);
    submit(formData, { method: "post", action: "/switch-tenant" });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{currentTenant.name}</span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            {tenants.map((tenant) => (
              <button
                key={tenant.id}
                type="button"
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                  tenant.id === currentTenant.id ? "bg-gray-100" : ""
                }`}
                onClick={() => handleTenantSwitch(tenant.id)}
              >
                {tenant.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
