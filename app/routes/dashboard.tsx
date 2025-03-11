import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
  
  // Get data for dashboard
  const ideas = await tenantContext.getIdeas();
  const boards = await tenantContext.getBoards();
  const features = await tenantContext.getFeatures();
  
  // Calculate statistics
  const stats = {
    totalIdeas: ideas.length,
    implementedIdeas: ideas.filter(idea => idea.status === 'IMPLEMENTED').length,
    totalFeatures: features.length,
    completedFeatures: features.filter(feature => feature.status === 'COMPLETED').length,
  };
  
  // If user is a reseller, get all tenants they have access to
  const tenants = userIsReseller ? await getResellerTenants(userId) : [];
  
  return json({ 
    user, 
    currentTenant, 
    stats,
    recentIdeas: ideas.slice(0, 5),
    recentFeatures: features.slice(0, 5),
    isReseller: userIsReseller,
    tenants
  });
}

export default function Dashboard() {
  const { 
    user, 
    currentTenant, 
    stats, 
    recentIdeas, 
    recentFeatures,
    isReseller,
    tenants
  } = useLoaderData<typeof loader>();
  
  return (
    <MainLayout 
      title="Dashboard" 
      activeRoute="/dashboard"
      currentTenant={currentTenant}
      tenants={tenants}
      isReseller={isReseller}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Ideas</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalIdeas}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Implemented Ideas</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.implementedIdeas}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Features</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalFeatures}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Completed Features</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.completedFeatures}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Ideas */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Ideas</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentIdeas.length === 0 ? (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  No ideas found.
                </li>
              ) : (
                recentIdeas.map((idea) => (
                  <li key={idea.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{idea.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          idea.status === 'NEW' ? 'bg-blue-100 text-blue-800' :
                          idea.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                          idea.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          idea.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {idea.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          By {idea.author.firstName} {idea.author.lastName}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {new Date(idea.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          
          {/* Recent Features */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Features</h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {recentFeatures.length === 0 ? (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
                  No features found.
                </li>
              ) : (
                recentFeatures.map((feature) => (
                  <li key={feature.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-purple-600 truncate">{feature.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          feature.status === 'PLANNED' ? 'bg-blue-100 text-blue-800' :
                          feature.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                          feature.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {feature.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Priority: {feature.priority}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          {new Date(feature.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
