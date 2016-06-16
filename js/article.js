var articles = [];

function Article(options) {
  this.title = options.title;
  this.category = options.category;
  this.author = options.author;
  this.image = options.image;
  this.publishedOn = options.publishedOn;
  this.body = options.body;
};

Article.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  var blogTemplate = $('#blog-template').html();
  var renderTemplate = Handlebars.compile(blogTemplate);
  return renderTemplate(this);
};

Article.loadAll = function() {
  articleData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - new Date(a.publishedOn);
  });

  articleData.forEach(function(element) {
    articles.push(new Article(element));
  });
  articles.forEach(function(a) {
    $('#articles').append(a.toHtml());
  });
};


Article.fetchAll = function() {
  if (localStorage.articleData) {
    Article.loadAll(JSON.parse(localStorage.articleData));
  } else {
    var cache = JSON.stringify(articleData);
    localStorage.setItem('articleData', cache);
    Article.loadAll(cache);
  }
};
