import { Divider, Typography } from "@mui/material";
import Billing from "../../../components/Billing";
import React, { useEffect, useState } from "react";
import axios from "axios";

function BillingDetails({ user }: { user: any }) {
  const [billingNotes, setBillingNotes] = useState<any>([]);

  // retrieve billing notes for the user
  const getBillingNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/billing/${user.memberID}/getBills`
      );
      console.log("Billing notes retrieved:", response.data);
      setBillingNotes(response.data);
    } catch (error) {
      console.log("Error retrieving billing notes:", error);
    }
  };

  useEffect(() => {
    getBillingNotes();
  }, []);

  return (
    <>
      <h1>Billing Notes</h1>
      <Divider style={{ marginBottom: "20px" }} />
      {billingNotes.length > 0 ? (
        <div>
          <Billing billingNotes={billingNotes} />
        </div>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No bills available.
        </Typography>
      )}
    </>
  );
}

export default BillingDetails;
