import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { switchTenant } from "~/utils/session.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const tenantId = formData.get("tenantId");
  
  if (!tenantId || typeof tenantId !== "string") {
    return json({ error: "Tenant ID is required" }, { status: 400 });
  }
  
  // Get the referrer to redirect back to the same page
  const referer = request.headers.get("Referer") || "/dashboard";
  const url = new URL(referer);
  const redirectTo = url.pathname;
  
  return switchTenant(request, tenantId, redirectTo);
}

// This route doesn't render anything, it just processes the form submission
export function loader() {
  return redirect("/dashboard");
}
