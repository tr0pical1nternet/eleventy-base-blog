const { DateTime } = require("luxon");
const fs = require("fs");
const sizeOf = require('image-size');
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const imageSizes = [360, 480, 640, 800, 1024, 1280, 1600];

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter("getPostIndexFromSlug", (postlist, slug) => {
    return postlist.findIndex(post => post.data.slug === slug);
  });

  eleventyConfig.addFilter("console", function(anything) {
    console.log(anything);
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

  eleventyConfig.addFilter("notFilter", (array, key) => {
    return array.filter(item => item.key !== key);
  });

  // Image shortcode
  eleventyConfig.addShortcode("image", function(slug, alt, classes, title) {
    const srcsetsWebp = new Array(imageSizes.length);
    const srcsetsJpg = new Array(imageSizes.length);
    const src = `/images/${slug}_${imageSizes[1]}.jpg`;

    imageSizes.forEach((size, index) => {
      const webp = `/images/${slug}_${size}.webp`;
      const jpg = `/images/${slug}_${size}.jpg`;

      if (fs.existsSync('dist/' + webp)) {srcsetsWebp[index] = `${webp} ${size}w`};
      if (fs.existsSync('dist/' + jpg)) {srcsetsJpg[index] = `${jpg} ${size}w`};
    });
    const dimensions = sizeOf('dist' + src);
    
    const classAttr = classes ? `class="${classes}"` : '';
    const titleAttr = title ? `title="${title}"` : '';
        
    const output =
      `<picture>
        <source srcset="${srcsetsWebp}">
        <source srcset="${srcsetsJpg}">
        <img ${classAttr} src="${src}" srcset="${srcsetsJpg.join(', ')}" ${titleAttr} alt="${alt}" width="${dimensions.width}" height="${dimensions.height}">
      </picture>`

    return output;
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
