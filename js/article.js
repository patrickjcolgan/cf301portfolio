(function (module) {

  function Travels(opts) {
    this.countryName = opts.countryName;
    this.locations = opts.locations;
    this.date = opts.date;
    this.purpose = opts.purpose;
  };

  Travels.all = [];
  Travels.less = [];

  Travels.prototype.toHtml = function() {
    var travelTemplate = $('#travel-template').html();
    var renderTemplate = Handlebars.compile(travelTemplate);
    return renderTemplate(this);
  };

  Travels.build = function(data) {
    data.forEach(function(ele) {
      Travels.all.push(new Travels(ele));
    });
  };

  Travels.render = function(arr) {
    console.log(arr);
    arr.forEach(function(a) {
      $('#mapTravel').append(a.toHtml());
    });
  };

  Travels.lessData = function() {
    Travels.less = Travels.all.reduce(function(start, ele) {
      if (ele.purpose === 'vacation') {
        start.push(new Travels(ele));
      }
      return start;
    }, []);
  };


  Travels.getAll = function() {
    if (localStorage.data) {
      Travels.build(JSON.parse(localStorage.data));
      travelView.initTravelInfo();
    } else {
      $.getJSON('/data/travel.json', function(data) {
        Travels.build(data);
        console.log(data);
        localStorage.setItem('data', JSON.stringify(data));
        travelView.initTravelInfo();
      });
    }
  };

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
    } else {
      $.getJSON('/data/blogArticles.json', function(rawData) {
        Article.loadAll(rawData);
        localStorage.setItem('rawData', JSON.stringify(rawData));
        articleView.initIndexPage();
      });
    }
  };
  module.Article = Article;
  module.Travels = Travels;
})(window);
