(function(module) {
  var articlesController = {};
  Article.fetchAll();

  // articlesController.index = function() {
  //   Article.fetchAll(articleView.initIndexPage);
  //   $('.tab-content').hide();
  //   $('#articles').show();
  // };
  articlesController.index = function() {
    if (Article.fetchAll.length) {
      $('.tab-about').hide();
      $('#articles').show();
    } else {
      Article.fetchAll(articleView.initIndexPage);
      $('.tab-about').hide();
      $('#articles').show();
    }
  };

  module.articlesController = articlesController;
})(window);
