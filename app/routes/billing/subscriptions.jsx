export default function Subscriptions() {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      description: "Perfect for small teams just getting started with innovation management.",
      features: [
        "Up to 10 users",
        "Basic idea management",
        "1 innovation board",
        "Email support"
      ],
      current: false
    },
    {
      name: "Professional",
      price: "$299",
      description: "For growing teams that need more advanced features and collaboration tools.",
      features: [
        "Up to 50 users",
        "Advanced idea management",
        "5 innovation boards",
        "Basic analytics",
        "Priority email support"
      ],
      current: false
    },
    {
      name: "Enterprise",
      price: "$499",
      description: "For organizations that need enterprise-grade security and advanced features.",
      features: [
        "Unlimited users",
        "Advanced idea management",
        "Unlimited innovation boards",
        "Advanced analytics",
        "AI-powered insights",
        "SSO integration",
        "Dedicated support"
      ],
      current: true
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Subscription Plans</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose the plan that best fits your organization's needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`bg-white rounded-lg shadow-sm overflow-hidden border-2 ${
              plan.current ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
              
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                {plan.current ? (
                  <div className="block w-full bg-blue-50 border border-blue-500 rounded-md py-2 text-sm font-medium text-blue-700 text-center">
                    Current Plan
                  </div>
                ) : (
                  <button
                    type="button"
                    className="block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Upgrade to {plan.name}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add-ons</h3>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">AI Assistant</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Advanced AI capabilities to help generate and refine ideas.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-4">$99/mo</span>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Advanced Analytics</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Detailed analytics and reporting for innovation metrics.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-4">$149/mo</span>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">API Access</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Full API access for custom integrations.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-4">$199/mo</span>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Active
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
