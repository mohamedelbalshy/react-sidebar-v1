import React from "react";
import { Typography } from "@mui/material";

import "./Market.css";

export const Market = React.memo(({ market }) => {
  return (
    <div className="coin-row" onClick={() => console.log(market)}>
      <Typography variant="h5" color="white" sx={{ width: "20%", textAlign: "center" }}>
        {market.market_cap_rank}
      </Typography>
      <div
        style={{
          width: "30%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          columnGap: "1.1em",
        }}
      >
        <img style={{ maxWidth: "2.5em" }} src={market.image} alt={market.name} />
        <Typography variant="subtitle1" color="whitesmoke">
          {market.name}
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: "300", color: "rgba(255, 255, 255, 0.5)" }}
        >
          {market.symbol}
        </Typography>
      </div>

      <Typography variant="body1" color="white" sx={{ width: "25%" }}>
        ${market.current_price}
      </Typography>
      {market.price_change_percentage_24h > 0 ? (
        <Typography variant="body1" className="up-percentage">
          {market.price_change_percentage_24h}%
        </Typography>
      ) : (
        <Typography variant="body1" className="down-percentage">
          {market.price_change_percentage_24h}%
        </Typography>
      )}
    </div>
  );
});
