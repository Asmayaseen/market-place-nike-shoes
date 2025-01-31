// src/app/admin/dashboard/page.tsx
import { useAuth } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  const { isSignedIn, user } = useAuth();

  if (!isSignedIn) {
    return <p>Please log in to access the admin panel.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.firstName}!</p>
    </div>
  );
};

export default Dashboard;
