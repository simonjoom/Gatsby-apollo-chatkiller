import React from "react";
import ReactDOM from "react-dom"
const preferDefault = m => (m && m.default) || m;
let Layout;
import "tachyons";
//import { createStore, combineReducers } from "redux";

import { AUTH_TOKEN } from "./constants/constants";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { split } from "apollo-link";
//import { onError } from "apollo-link-error";
//import { ApolloClient, InMemoryCache, HttpLink, split } from 'apollo-client-preset';
import { WebSocketLink } from "apollo-link-ws";
//import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "apollo-utilities";
const materializeAsync = () =>
  import(/* webpackChunkName: "materialize" */ "./components/materialize");

/*
global.menuList = window.__INITIAL_STATE__.menuList;
global.filesQuery = window.__INITIAL_STATE__.filesQuery;
global.locale = window.__INITIAL_STATE__.locale;
 */

var canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);
global.M = undefined;
global.isSSR = false;

export const replaceHydrateFunction = async () => {
  if (!global.M) {
    const materialize = await materializeAsync();
    global.M = materialize.default;
  }
  return (element, container, callback) => {
    class App extends React.Component {
      render() {
        return <div id="App">{element}</div>;
      }
    }
    const renderFn = process.env.NODE_ENV !== 'production' ? ReactDOM.render : ReactDOM.hydrate;
    if (/comp|inter|loaded/.test(document.readyState)) {
      Waves.displayEffect();
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        function() {
          Waves.displayEffect();
        },
        false
      );
    }
   return renderFn(element,container,callback)
  };
};

try {
  Layout = preferDefault(require(GATSBY_LAYOUT_COMPONENT_PATH));
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    throw new Error(
      `Couldn't find layout component at "${GATSBY_LAYOUT_COMPONENT_PATH}.\n\n` +
        `Please create layout component in that location or specify path to layout component in gatsby-config.js`
    );
  } else {
    throw e;
  }
}

console.log("AUTH_TOKEN", AUTH_TOKEN);
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
    connectionParams: () => ({
      authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    })
  }
});
const httpLink = new createHttpLink({ uri: "http://localhost:4000" });

const middlewareAuthLink = setContext((_, { headers }) => {
  console.log("middlewareAuthLink", AUTH_TOKEN);
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ``
    }
  };
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithAuthToken
);

const client = new ApolloClient({
  link,
  ssrMode: false,
  cache: new InMemoryCache()
});

export const wrapPageElement = ({ element, props }) => {
  // const { lng } = props.pageContext;
  // if (!lng)
  return <Layout>{element}</Layout>;
};

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {element}
    </ApolloProvider>
  );
};
