import UserGrid from "@/components/UserGrid";
import { Typography } from "@mui/material";
import React from "react";

export default function Admin() {
  return (
    <div
      style={{
        margin: "2rem",
        marginTop: "4rem",
      }}
    >
      <h1>Admin</h1>
      <Typography> Color: #ffa31a orange</Typography>

      <UserGrid />
    </div>
  );
}
