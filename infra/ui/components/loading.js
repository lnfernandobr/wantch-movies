import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Loading = () => (
  <div className="loading">
    <CircularProgress disableShrink />
  </div>
);
