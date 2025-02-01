import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>; // Loading state while Clerk is loading
  }

  if (!isSignedIn) {
    return <div>You are not signed in. Please sign in first.</div>; // Handle not signed-in state
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar and Main Content */}
      <aside className="w-64 bg-gray-900 text-white p-5 min-h-screen">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="mt-4 space-y-2">
          <Link href="/dashboard" className="block text-lg">🏠 Dashboard</Link>
          <Link href="/dashboard/orders" className="block text-lg">📦 Orders</Link>
          <Link href="/dashboard/products" className="block text-lg">🛒 Products</Link>
          <Link href="/dashboard/users" className="block text-lg">👤 Users</Link>
          <Link href="/dashboard/settings" className="block text-lg">⚙️ Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
