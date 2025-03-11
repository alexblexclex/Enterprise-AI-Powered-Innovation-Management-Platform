export default function BillingHistory() {
  const invoices = [
    {
      id: "INV-2023-005",
      date: "May 1, 2023",
      amount: "$499.00",
      status: "Paid",
      downloadUrl: "#"
    },
    {
      id: "INV-2023-004",
      date: "Apr 1, 2023",
      amount: "$499.00",
      status: "Paid",
      downloadUrl: "#"
    },
    {
      id: "INV-2023-003",
      date: "Mar 1, 2023",
      amount: "$499.00",
      status: "Paid",
      downloadUrl: "#"
    },
    {
      id: "INV-2023-002",
      date: "Feb 1, 2023",
      amount: "$299.00",
      status: "Paid",
      downloadUrl: "#"
    },
    {
      id: "INV-2023-001",
      date: "Jan 1, 2023",
      amount: "$299.00",
      status: "Paid",
      downloadUrl: "#"
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Billing History</h2>
        <p className="mt-1 text-sm text-gray-500">
          View and download your past invoices.
        </p>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <li key={invoice.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-sm text-gray-500">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 mr-4">{invoice.amount}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status}
                    </span>
                    <a
                      href={invoice.downloadUrl}
                      className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
