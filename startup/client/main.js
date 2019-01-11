import "./main.css";
import "./main.html";
import ApolloClient from "apollo-client";
import React from "react";
import { render } from "react-dom";
import { Meteor } from "meteor/meteor";
import { BrowserRouter } from "react-router-dom";
import { InMemoryCache } from "apollo-cache-inmemory";
import { DDPLink } from "meteor/swydo:ddp-apollo";
import { ApolloProvider } from "react-apollo";
import { SnackbarProvider } from "notistack";
import { AppContainer } from "../../infra/ui/AppContainer";
import { Provider } from "react-redux";

import { store } from "../../infra/redux/store";

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
            <AppContainer />
          </Provider>
        </SnackbarProvider>
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById("app")
  );
});
