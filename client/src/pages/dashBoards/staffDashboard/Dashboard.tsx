import React from "react";

function Dashboard({ user }: { user: any }) {
  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <p>
        As administrative staff, you have access to various functions to manage
        the facility effectively. Use the tabs below to navigate and complete
        different tasks:
      </p>
      <ul>
        <li>Room Booking Management</li>
        <li>Equipment Maintenance Monitoring</li>
        <li>Class Schedule Updating</li>
        <li>Billing and Payment Processing</li>
      </ul>
    </div>
  );
}

export default Dashboard;
