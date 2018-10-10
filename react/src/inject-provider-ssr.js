import React from "react";
const preferDefault = m => (m && m.default) || m;
let Layout;
//import "tachyons";
//import { createStore, combineReducers } from "redux";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory"; 

const materializeAsync = () =>
  import(/* webpackChunkName: "materialize" */ "./components/materialize");
/*
global.menuList = window.__INITIAL_STATE__.menuList;
global.filesQuery = window.__INITIAL_STATE__.filesQuery;
global.locale = window.__INITIAL_STATE__.locale;
 */
global.isSSR = true;

global.M = undefined;

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
        M.startTextFields()
      Waves.displayEffect();
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        function() {
        M.startTextFields()
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

const httpLink = new createHttpLink({ uri: "http://localhost:4000" });


const client = new ApolloClient({
  link:httpLink,
  ssrMode: false,
  cache: new InMemoryCache()
})

export const wrapPageElement = ({ element, props }) => {
  // const { lng } = props.pageContext;
  // if (!lng)
  return (
      <Layout location={props.location}>{element}</Layout>
  );
};

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      {element}
    </ApolloProvider>
  );
};
