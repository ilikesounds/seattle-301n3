// TODO: (DONE) Define a function that hides all main section elements, and then reveals just the #about section:
(function(module) {
    var aboutController = {};
    Article.createTable();
    aboutController.index = function() {
      Article.fetchAll(articleView.initIndexPage),
        $("main > section").hide(),
        $("#about").show()
    }
  module.aboutController = aboutController;
})(window);
