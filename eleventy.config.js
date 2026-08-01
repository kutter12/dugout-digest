module.exports = function (eleventyConfig) {
  // Copy static assets straight through
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // Collection of all articles
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => a.date - b.date);
  });

  // Readable date, e.g. "Aug 1, 2026"
  eleventyConfig.addFilter("readableDate", function (d) {
    const dt = d instanceof Date ? d : new Date(d);
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  });

  // Filter a list of posts by category
  eleventyConfig.addFilter("byCategory", function (posts, cat) {
    return (posts || []).filter((p) => p.data.category === cat);
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
