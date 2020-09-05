// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
// });
// module.exports = withMDX({
//   pageExtensions: ["js", "jsx", "mdx"],
// });

const withMdxEnhanced = require("next-mdx-enhanced");

module.exports = withMdxEnhanced({
  layoutPath: "layouts",
  defaultLayout: true,
  // remarkPlugins: [
  //   require('remark-autolink-headings'),
  //   require('remark-slug'),
  //   require("remark-code-titles"),
  // ],
})({
  experimental: {
    modern: true,
  },
  // webpack: (config, { isServer }) => {
  //   // if (isServer) {
  //   //   require('./scripts/generate-sitemap');
  //   // }

  //   return config;
  // }
});
