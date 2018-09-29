const path = require("path");
const crypto = require(`crypto`);
require("babel-polyfill");

const arraymenu = [
  "/",
  "/about",
  "/jumpsuit",
  "/concept",
  "/contact",
  "/hotels"
];
const arraygallery = ["/", "/about", "/concept"];

const postNodes = [];
let didRunAlready = false;
let absoluteComponentPath;

exports.onPreInit = ({ store }, { component }) => {
  const defaultLayoutComponentPath = `src/layouts/index`;
  if (!component) {
    // Default to `src/layouts/index.[js|jsx]` for drop-in replacement of v1 layouts
    component = path.join(
      store.getState().program.directory,
      defaultLayoutComponentPath
    );
  }

  if (didRunAlready) {
    throw new Error(
      `You can only have single instance of gatsby-plugin-layout in your gatsby-config.js`
    );
  }

  didRunAlready = true;
  absoluteComponentPath = component;
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        GATSBY_LAYOUT_COMPONENT_PATH: JSON.stringify(absoluteComponentPath)
      })
    ]
  });
};

exports.onCreatePage = ({ page, actions }) => {
  const { deletePage, createPage } = actions;
  let oldPage = Object.assign({}, page);
  /* if (page.path.match(/car/) && !page.matchPath) {
    let newPage = { component: page.component };
    newPage.path = page.path;
    newPage.matchPath = `/cars`;
    deletePage(oldPage);
    // Update the page.
    createPage(newPage);
    let newPage2 = Object.assign({}, newPage, { matchPath: `/api` });
    createPage(newPage2);
    let newPage3 = Object.assign({}, newPage, { matchPath: `/car/:id` });
    createPage(newPage3);
  } else if (page.path.match("/") && !page.matchPath) {
    let newPage = { component: page.component };
    newPage.path = page.path;
    newPage.matchPath = `/`;
    deletePage(oldPage);
    // Update the page.
    createPage(newPage);
  } else
  */
  console.log(page.path);
  if (page.path == "/" && !page.matchPath) {
    let newPage = { component: page.component, path: "/" };
    let newPage1 = Object.assign({}, newPage, { matchPath: `/create` });
    createPage(newPage1);
    let newPage2 = Object.assign({}, newPage, { matchPath: `/api` });
    createPage(newPage2);
    let newPage3 = Object.assign({}, newPage, { matchPath: `/post/:id` });
    createPage(newPage3);
    let newPage4 = Object.assign({}, newPage, { matchPath: `/drafts` });
    createPage(newPage4);
    let newPage5 = Object.assign({}, newPage, { matchPath: `/chats` });
    createPage(newPage5);
    let newPage6 = Object.assign({}, newPage, { matchPath: `/car/:id` });
    createPage(newPage6);
    let newPage7 = Object.assign({}, newPage, { matchPath: `/cars` });
    createPage(newPage7);
    let newPage8 = Object.assign({}, newPage, { matchPath: `/users` });
    createPage(newPage8);
    let newPage9 = Object.assign({}, newPage, { matchPath: `/user/:id` });
    createPage(newPage9);
    let newPage10 = Object.assign({}, newPage, {
      matchPath: `/forgetPassword`
    });
    createPage(newPage10);
    let newPage11 = Object.assign({}, newPage, { matchPath: `/resetPassword` });
    createPage(newPage11);
    let newPage12 = Object.assign({}, newPage, {
      matchPath: `/updatePassword`
    });
    createPage(newPage12);
    let newPage13 = Object.assign({}, newPage, { matchPath: `/validateEmail` });
    createPage(newPage13);
    let newPage14 = Object.assign({}, newPage, { matchPath: `/signup` });
    createPage(newPage14);
    let newPage15 = Object.assign({}, newPage, { matchPath: `/login` });
    createPage(newPage15);
    let newPage16 = Object.assign({}, newPage, { matchPath: `/posts` });
    createPage(newPage16);
    let newPage17 = Object.assign({}, newPage, { matchPath: `/post/:id` });
    createPage(newPage17);
  }
  /*
  } else if (page.path.match(/user/) && !page.matchPath) {
    let newPage = { component: page.component };
    newPage.path = page.path;
    newPage.matchPath = `/users`;
    deletePage(oldPage);
    // Update the page.
    createPage(newPage);
    let newPage3 = Object.assign({}, newPage, { matchPath: `/user/:id` });
    createPage(newPage3);
  } else if (page.path.match(/login/) && !page.matchPath) {
    let newPage = { component: page.component };
    newPage.path = page.path;
    newPage.matchPath = `/forgetPassword`;
    deletePage(oldPage);
    // Update the page.
    createPage(newPage);
    let newPage1 = Object.assign({}, newPage, { matchPath: `/resetPassword` });
    createPage(newPage1);
    let newPage2 = Object.assign({}, newPage, { matchPath: `/updatePassword` });
    createPage(newPage2);
    let newPage3 = Object.assign({}, newPage, { matchPath: `/validateEmail` });
    createPage(newPage3);
    let newPage4 = Object.assign({}, newPage, { matchPath: `/signup` });
    createPage(newPage4);
    let newPage5 = Object.assign({}, newPage, { matchPath: `/login` });
    createPage(newPage5);
  }*/
};
