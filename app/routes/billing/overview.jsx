export default function BillingOverview() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Billing Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and billing information.
        </p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Current Plan</h3>
            <p className="text-2xl font-bold text-gray-900">Enterprise</p>
            <p className="text-sm text-gray-500">$499 / month</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Upgrade Plan
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h3>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4ZM4 6H20V10H4V6ZM4 12H6V14H4V12ZM8 12H10V14H8V12ZM4 16H12V18H4V16Z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
              <p className="text-sm text-gray-500">Expires 12/2025</p>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Update payment method
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Billing Information</h3>
          <div>
            <p className="text-sm text-gray-900">Acme Corporation</p>
            <p className="text-sm text-gray-500">123 Main St.</p>
            <p className="text-sm text-gray-500">San Francisco, CA 94103</p>
            <p className="text-sm text-gray-500">United States</p>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Update billing information
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Upcoming Invoice</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Next billing date</dt>
                <dd className="mt-1 text-sm text-gray-900">June 1, 2023</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="mt-1 text-sm text-gray-900">$499.00</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
