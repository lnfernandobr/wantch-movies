import React, { Fragment } from "react";
import { MenuContainer } from "../../app/menu/MenuContainer";
import { Login } from "../../app/login/Login";
import { Routes } from "../routes/Routes";

export const App = () => {
  if (Meteor.userId()) {
    return (
      <Fragment>
        <div style={{ paddingBottom: "120px" }}>
          <MenuContainer />
        </div>

        <div className="main">
          <Routes />
        </div>
      </Fragment>
    );
  }
  return <Login />;
};
