const { DateTime } = require("luxon");
const fs = require("fs");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
// const pluginEleventySrcset = require("eleventy-plugin-srcset");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  // eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("getPostIndexFromSlug", (postlist, slug) => {
    return postlist.findIndex(post => post.data.slug === slug);
  });

  // Get a post from order
  eleventyConfig.addFilter("isDefined", (variable) => {
    return typeof variable !== 'undefined';
  });

  // Sort posts by data.order
  eleventyConfig.addFilter("sortByOrder", (postlist, isDSC) => { 
    const sortDSC = isDSC ? -1 : 1;
    
    postlist.sort((a, b) => {
      return sortDSC * (a.data.order - b.data.order);
    });
    return postlist;
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('dist/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: "src/templates",
      includes: "_includes",
      data: "_data",
      output: "dist"
    }
  };
};
