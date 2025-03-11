// This is a placeholder for actual authentication logic
// In a real application, you would implement proper authentication with a backend

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Mock function to simulate login
export async function login(email: string, password: string): Promise<User | null> {
  // This is just a mock implementation
  if (email === "admin@example.com" && password === "password") {
    return {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
    };
  }
  return null;
}

// Mock function to simulate registration
export async function register(
  email: string,
  password: string,
  name: string
): Promise<User | null> {
  // This is just a mock implementation
  return {
    id: "2",
    email,
    name,
    role: "user",
  };
}

// Mock function to check if user is authenticated
export function isAuthenticated(): boolean {
  // In a real app, you would check for a valid token in localStorage or cookies
  return localStorage.getItem("isAuthenticated") === "true";
}

// Mock function to get the current user
export function getCurrentUser(): User | null {
  // In a real app, you would decode the JWT token or fetch user data from an API
  const isAuth = isAuthenticated();
  if (!isAuth) return null;
  
  return {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  };
}

// Mock function to logout
export function logout(): void {
  // In a real app, you would clear tokens from localStorage or cookies
  localStorage.removeItem("isAuthenticated");
}
