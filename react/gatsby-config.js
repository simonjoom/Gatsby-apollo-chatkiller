module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: ["gatsby-plugin-sass",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/static/assets/`
      }
    }]
 }
