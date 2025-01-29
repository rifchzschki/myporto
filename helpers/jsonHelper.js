module.exports = function (handlebars) {
  handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context);
  });
};
