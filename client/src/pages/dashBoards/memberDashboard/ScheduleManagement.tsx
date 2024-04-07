import React from "react";

function ScheduleManagement({ user }: { user: any }) {
  const handleSubmit = () => {
    console.log("hello");
  };
  return (
    <div>
      ScheduleManagement
      <form onSubmit={handleSubmit}>
        <button type="submit">hello</button>
      </form>
    </div>
  );
}

export default ScheduleManagement;
