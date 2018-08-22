module.exports = {
  siteMetadata: {
    title: 'Derek Shiller Website',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-36693042-1",
      },
    },
  ],
}
