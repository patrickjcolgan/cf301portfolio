(function (module) {

  function Article(options) {
    this.title = options.title;
    this.category = options.category;
    this.author = options.author;
    this.image = options.image;
    this.publishedOn = options.publishedOn;
    this.body = options.body;
  };

  Article.all = [];

  Article.prototype.toHtml = function() {
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    var blogTemplate = $('#blog-template').html();
    var renderTemplate = Handlebars.compile(blogTemplate);
    return renderTemplate(this);
  };

  Article.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - new Date(a.publishedOn);
    });

    rawData.forEach(function(element) {
      Article.all.push(new Article(element));
    });
  };


  Article.fetchAll = function() {
    if (localStorage.rawData) {
      Article.loadAll(JSON.parse(localStorage.rawData));
      articleView.initIndexPage();
      // next();
    } else {
      $.getJSON('/data/blogArticles.json', function(rawData) {
        Article.loadAll(rawData);
        localStorage.setItem('rawData', JSON.stringify(rawData));
        articleView.initIndexPage();
        // next();
      });
    }
  };
  module.Article = Article;
})(window);
