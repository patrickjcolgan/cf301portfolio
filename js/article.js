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
  var $newArticle = $('.template').clone();

  $newArticle.attr('data-category', this.category);
  $newArticle.find('byline a').html(this.author);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('article-body').html(this.body);
  //Publication date to show on hover
  $newArticle.find('time[pubdate]').attr('datatime', this.publishedOn);
  //Display date as relative number of 'days ago'
  $newArticle.find('time').html('about' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + 'days ago');

  $newArticle.append('<hr>');

  $newArticle.removeClass('template');
  return $newArticle;
};

articleData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - new Date(a.publishedOn);
});

articleData.forEach(function(element) {
  articles.push(new Article(element));
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
