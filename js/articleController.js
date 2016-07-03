(function(module) {
  var articlesController = {};
  Article.createTable();

  articlesController.index = function() {
    Article.fetchAll(articleView.initIndexPage);
    $('.tab-content').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
