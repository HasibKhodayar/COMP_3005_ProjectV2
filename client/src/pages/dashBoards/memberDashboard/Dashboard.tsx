import React, { useState } from "react";

function Dashboard({ user }: { user: any }) {
  return (
    <div>
      <h1>
        Welcome to your dashboard,{" "}
        {user.firstName === "" ? "Guest" : user.firstName}!
      </h1>
    </div>
  );
}

export default Dashboard;
