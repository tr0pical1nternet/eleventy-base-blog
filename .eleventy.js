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
    
    if (Array.isArray(postlist)) {
      postlist.sort((a, b) => {
        return sortDSC * (a.data.order - b.data.order);
      });

      return postlist;
    } else {
      return undefined;
    }
  });

  eleventyConfig.addFilter("notFilter", (array, key) => {
    return array.filter(item => item.key !== key);
  });

  eleventyConfig.addFilter("isActive", (navSlug, pageSlug, tag) => {
    
    if (navSlug === pageSlug || navSlug === tag) {
      return true;
    } else {
            return false;
    }
  });

  // Image generator
  function picture(slug, alt, classes, title) {
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
          <source srcset="${srcsetsWebp}" type="image/webp">
          <source srcset="${srcsetsJpg}" type="image/jpeg">
          <img ${classAttr} src="${src}" srcset="${srcsetsJpg.join(', ')}" ${titleAttr} alt="${alt}" width="${dimensions.width}" height="${dimensions.height}">
      </picture>`

    return output;
  }

  // Image shortcode
  eleventyConfig.addShortcode("image", function(slug, alt, classes, title) {
    return picture(slug, alt, classes, title)
  });

  eleventyConfig.addShortcode("postFigure", function(slug, alt, classes, title) {
    classes = classes ? 'post-figure ' + classes : 'post-figure';
    return `<figure class="${classes}">${picture(slug, alt, null, title)}</figure>`
  });

  eleventyConfig.addShortcode("workScroll", function(slug, alt, classes, title) {
    return `<div class="work-scroll">
      <figure>
        ${picture(slug, alt, classes, title)}
      </figure>
      <div class="work-scroll-caption">← Scroll Me →</div>
    </div>`
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
