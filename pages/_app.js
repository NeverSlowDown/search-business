import React from "react";
import { wrapper } from "../redux/store";
import { ApolloProvider } from "@apollo/client";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    "WBlsdluPZwpMu-1ySbBOQ5A0eaeqGkg_Sb3AzTTMGkmaeDdOLR024Zi0Tu2VvZ24mUrzTXjGxNJF54vSSC-tmeiCylDQI00kObyqIXPdqgOFUEecTf166lQg1JGbYHYx";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Accept-Language": "en-US",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default wrapper.withRedux(MyApp);
