import React from "react";
import { wrapper } from "../redux/store";
import { ApolloProvider } from "@apollo/client";

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const ResetStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

const mainTheme = {
  main: "#2278DD",
  secondary: "#ff9838",
  font: "Nunito",
};

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

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.font}
  }
  * {
    box-sizing: border-box;
  }
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      {/* let's reset the css styles so we can style with comfort */}
      <ResetStyles />
      {/* in case we have "dark mode" or different style modes depending of the "business chosen", let's use mainTheme for the moment */}
      <ThemeProvider theme={mainTheme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default wrapper.withRedux(MyApp);
