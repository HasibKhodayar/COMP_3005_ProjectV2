import React from "react";
import { PurchaseType } from "./types";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function Billing({ billingNotes }: { billingNotes: any }) {
  return (
    <>
      <TableContainer component={Paper} sx={{ width: 750 }}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#F0F0F0" }}>
              <TableCell>Email</TableCell>
              <TableCell align="right">Payment Date</TableCell>
              <TableCell align="right">Amount&nbsp;($)</TableCell>
              <TableCell align="right">Purchase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingNotes.map((bill: any) => (
              <TableRow
                key={bill.billingId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bill.member.email}
                </TableCell>
                <TableCell align="right">{bill.paymentDate}</TableCell>
                <TableCell align="right">{bill.amount}</TableCell>
                <TableCell align="right">{bill.purchaseType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Billing;
