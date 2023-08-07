const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "sr"],
    defaultLocale: "en",
    localePath: path.resolve("./public/locales"),
  },
};
