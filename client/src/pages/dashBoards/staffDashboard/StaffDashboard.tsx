import React, { useState, useEffect } from "react";
import axios from "axios";

const StaffDashboard = ({ user }: { user: any }) => {
  return <div>staff fashbaord for user: {user.email}</div>;
};

export default StaffDashboard;
