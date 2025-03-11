export default function BillingUsage() {
  const usageData = {
    users: {
      current: 42,
      limit: 100,
      percentage: 42
    },
    storage: {
      current: 2.7,
      limit: 10,
      percentage: 27
    },
    apiCalls: {
      current: 15243,
      limit: 50000,
      percentage: 30
    },
    ideas: {
      current: 156,
      limit: "Unlimited",
      percentage: 0
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Usage & Limits</h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor your current usage and plan limits.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Active Users</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {usageData.users.current} of {usageData.users.limit} users
            </span>
            <span className="text-sm font-medium text-gray-900">
              {usageData.users.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${usageData.users.percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Storage</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {usageData.storage.current} GB of {usageData.storage.limit} GB
            </span>
            <span className="text-sm font-medium text-gray-900">
              {usageData.storage.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${usageData.storage.percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">API Calls</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {usageData.apiCalls.current.toLocaleString()} of {usageData.apiCalls.limit.toLocaleString()} calls
            </span>
            <span className="text-sm font-medium text-gray-900">
              {usageData.apiCalls.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${usageData.apiCalls.percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Ideas</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {usageData.ideas.current.toLocaleString()} ideas
            </span>
            <span className="text-sm font-medium text-gray-900">
              {usageData.ideas.limit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Usage History</h3>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Usage graph will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Download Usage Report
        </button>
      </div>
    </div>
  );
}
