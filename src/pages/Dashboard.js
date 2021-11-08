import React from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";

import { Markets } from "../components/Markets/Markets";

function Dashboard() {
  return (
    <Container
      component="main"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Markets />

      {/* <coingecko-coin-price-chart-widget
        coin-id="bitcoin"
        currency="usd"
        height="600"
        width="800"
        locale="en"
      ></coingecko-coin-price-chart-widget> */}
    </Container>
  );
}

export default Dashboard;
