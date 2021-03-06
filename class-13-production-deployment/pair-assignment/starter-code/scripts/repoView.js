(function(module) {
  var repoView = {};

  var ui = function() {
    // Best practice: Cache the DOM query if it's used more than once.
    var $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  // Set up a new compile method to help render our repos.
  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    ui();

    $('#about ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);
