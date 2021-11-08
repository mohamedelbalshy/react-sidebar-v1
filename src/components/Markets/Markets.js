import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";

import { Market } from "../Market/Market";
import { getMarketData } from "../../services/cryptoService";
import "./Markets.css";

export const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [page, setPage] = useState(1);
  const [marketLoading, setMarketLoading] = useState(true);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);

  const loadMore = () => {
    setFetchingFromServer(true);
    getMarketData(page)
      .then((response) => {
        setMarkets([...markets, ...response]);
        setPage(page + 1);
        setFetchingFromServer(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setMarketLoading(true);
      getMarketData(page)
        .then((response) => {
          setMarkets(response);
          setMarketLoading(false);
          setPage(page + 1);
        })
        .catch((error) => console.log(error));
    }

    return () => [(isSubscribed = false)];
  }, []);

  if (markets.length == 0) return <></>;

  return (
    <>
      <div className="coin-list">
        {markets.map((market) => (
          <Market market={market} key={market.id} />
        ))}
      </div>
      <Button
        variant="outlined"
        color="primary"
        sx={{ borderRadius: "20px", marginBottom: "100px" }}
        onClick={loadMore}
      >
        See More {fetchingFromServer ? <CircularProgress size={15} /> : null}
      </Button>
    </>
  );
};
