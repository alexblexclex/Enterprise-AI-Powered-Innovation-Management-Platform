import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import MainLayout from "~/components/layout/MainLayout";
import { requireUserId, getUser, isReseller, getCurrentTenantId } from "~/utils/session.server";
import { getCurrentTenant, getResellerTenants, createTenantContext } from "~/utils/tenant.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const user = await getUser(request);
  const tenantId = await getCurrentTenantId(request);
  const currentTenant = await getCurrentTenant(request);
  
  // Check if user is a reseller
  const userIsReseller = await isReseller(userId);
  
  // Get tenant context for data operations
  const tenantContext = createTenantContext(tenantId);
  
  // Get boards for the current tenant
  const boards = await tenantContext.getBoards();
  
  // If user is a reseller, get all tenants they have access to
  const tenants = userIsReseller ? await getResellerTenants(userId) : [];
  
  return json({ 
    user, 
    currentTenant, 
    boards, 
    isReseller: userIsReseller,
    tenants
  });
}

export default function Board() {
  const { user, currentTenant, boards, isReseller, tenants } = useLoaderData<typeof loader>();
  
  return (
    <MainLayout 
      title="Innovation Boards" 
      activeRoute="/board"
      currentTenant={currentTenant}
      tenants={tenants}
      isReseller={isReseller}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Innovation Boards</h1>
          <Link
            to="/board/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Create New Board
          </Link>
        </div>
        
        {boards.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <p className="text-gray-500">No boards found. Create your first innovation board to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boards.map((board) => (
              <div key={board.id} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{board.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{board.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-2">{board.ideas.length} ideas</span>
                      <span className="mx-1">•</span>
                      <span>{board.features.length} features</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 sm:px-6">
                  <Link
                    to={`/board/${board.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View Board <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
