(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // $('#about').show().siblings().hide();

    $('.tab-content').hide();
    $('#about').show();
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
