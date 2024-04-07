import React, { useState, useEffect } from "react";
import axios from "axios";

const TrainerDashboard = ({ user }: { user: any }) => {
  return <div>trainer fashbaord for user: {user.email}</div>;
};

export default TrainerDashboard;
