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
  
  // Get ideas for the current tenant
  const ideas = await tenantContext.getIdeas();
  
  // If user is a reseller, get all tenants they have access to
  const tenants = userIsReseller ? await getResellerTenants(userId) : [];
  
  return json({ 
    user, 
    currentTenant, 
    ideas, 
    isReseller: userIsReseller,
    tenants
  });
}

export default function Ideas() {
  const { user, currentTenant, ideas, isReseller, tenants } = useLoaderData<typeof loader>();
  
  return (
    <MainLayout 
      title="Ideas Repository" 
      activeRoute="/ideas"
      currentTenant={currentTenant}
      tenants={tenants}
      isReseller={isReseller}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Ideas Repository</h1>
          <Link
            to="/ideas/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Add New Idea
          </Link>
        </div>
        
        {ideas.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
            <p className="text-gray-500">No ideas found. Create your first idea to get started.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {ideas.map((idea) => (
                <li key={idea.id}>
                  <Link to={`/ideas/${idea.id}`} className="block hover:bg-gray-50">
                    <div className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-blue-600">{idea.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          idea.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                          idea.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                          idea.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          idea.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {idea.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{idea.description}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <p>By {idea.author.firstName} {idea.author.lastName}</p>
                        <span className="mx-1">•</span>
                        <p>{new Date(idea.createdAt).toLocaleDateString()}</p>
                        <span className="mx-1">•</span>
                        <p>{idea.votes.length} votes</p>
                        <span className="mx-1">•</span>
                        <p>{idea.comments.length} comments</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
