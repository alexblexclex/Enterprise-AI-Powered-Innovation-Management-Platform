import { Form, Link } from "@remix-run/react";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <div className="flex justify-center mb-8">
          <img src="/logo-light.png" alt="IdeaFlow Logo" className="h-12 w-auto" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">Reset your password</h1>
        
        <Form method="post" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700"
            >
              Send Reset Link
            </button>
          </div>
        </Form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <span>Remember your password? </span>
          <Link
            className="text-blue-500 underline"
            to="/auth/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
