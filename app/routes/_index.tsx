import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo-light.png" alt="IdeaFlow Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-900">IdeaFlow</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/features" className="text-gray-700 hover:text-blue-600">Features</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/auth/login" className="text-gray-700 hover:text-blue-600">Sign In</Link>
            <Link to="/auth/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Unleash Your Team's</span>
              <span className="block text-blue-600">Creative Potential</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              IdeaFlow is an AI-powered innovation management platform that helps enterprises capture, develop, and implement groundbreaking ideas.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="rounded-md shadow">
                <Link to="/auth/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                  Start Free Trial
                </Link>
              </div>
              <div className="ml-3 rounded-md shadow">
                <Link to="/demo" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Request Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Powerful Features for Innovation</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to transform ideas into reality.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Idea Generation</h3>
              <p className="mt-2 text-base text-gray-500">
                Leverage advanced AI to generate, refine, and expand on ideas based on your business goals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Collaborative Workspaces</h3>
              <p className="mt-2 text-base text-gray-500">
                Create dedicated spaces for teams to collaborate, share ideas, and work together seamlessly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Advanced Analytics</h3>
              <p className="mt-2 text-base text-gray-500">
                Track innovation metrics, measure impact, and gain insights into your organization's creative output.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose IdeaFlow?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Transform how your organization innovates and drives growth.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Increase Innovation Output</h3>
                <p className="mt-2 text-base text-gray-500">
                  Organizations using IdeaFlow see a 3x increase in viable innovation concepts compared to traditional methods.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Reduce Time to Implementation</h3>
                <p className="mt-2 text-base text-gray-500">
                  Cut the time from idea to implementation by 40% with our streamlined workflows and AI assistance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Enhance Team Collaboration</h3>
                <p className="mt-2 text-base text-gray-500">
                  Break down silos and foster cross-functional collaboration with our intuitive platform.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Enterprise-Grade Security</h3>
                <p className="mt-2 text-base text-gray-500">
                  Rest easy knowing your intellectual property is protected with our SOC 2 compliant security measures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to transform your innovation process?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-blue-100">
              Join thousands of forward-thinking companies already using IdeaFlow.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="rounded-md shadow">
                <Link to="/auth/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Start Free Trial
                </Link>
              </div>
              <div className="ml-3 rounded-md shadow">
                <Link to="/contact" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/features" className="text-gray-300 hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
                <li><Link to="/security" className="text-gray-300 hover:text-white">Security</Link></li>
                <li><Link to="/roadmap" className="text-gray-300 hover:text-white">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link to="/customers" className="text-gray-300 hover:text-white">Customers</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link to="/guides" className="text-gray-300 hover:text-white">Guides</Link></li>
                <li><Link to="/webinars" className="text-gray-300 hover:text-white">Webinars</Link></li>
                <li><Link to="/documentation" className="text-gray-300 hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms</Link></li>
                <li><Link to="/cookies" className="text-gray-300 hover:text-white">Cookies</Link></li>
                <li><Link to="/licenses" className="text-gray-300 hover:text-white">Licenses</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <img src="/logo-dark.png" alt="IdeaFlow Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-white">IdeaFlow</span>
            </div>
            <p className="mt-4 md:mt-0 text-gray-400">
              &copy; {new Date().getFullYear()} IdeaFlow, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
