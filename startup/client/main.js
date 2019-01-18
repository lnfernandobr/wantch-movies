import { SnackbarProvider } from "notistack";
import { Meteor } from "meteor/meteor";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Provider } from "react-redux";
import { DDPLink } from "meteor/swydo:ddp-apollo";
import { store } from "../../infra/redux/store";
import { render } from "react-dom";
import { App } from "../../infra/ui/App";
import ApolloClient from "apollo-client";
import React from "react";
import "./main.css";
import "./main.html";

const client = new ApolloClient({
  link: new DDPLink(),
  cache: new InMemoryCache()
});

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <Provider store={store}>
            <App />
          </Provider>
        </SnackbarProvider>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("app")
  );
});
