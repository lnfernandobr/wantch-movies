import React, { Fragment } from "react";
import Menu from "../../app/menu/Menu";
import { Login } from "../../app/login/Login";
import { Routes } from "../routes/Routes";

export const App = () => {
  return (
    <Fragment>
      {Meteor.userId() ? (
        <div>
          <Menu />

          <div className="main">
            <Routes />
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};
