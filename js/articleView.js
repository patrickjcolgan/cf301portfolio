var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var value = $(this).attr('data-category');
      var optionTag = '<option value="' + value + '">' + value + '</option>';
      if ($('#category-filter option[value="' + value + '"]').length === 0) {
      $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.manageCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      var $selection = $(this).val();
      $('article').hide();
      $('article[data-category="' + $selection + '"]').fadeIn(1000);
      $('#category-filter option:eq(0)').text('-- Show all --');

    } else {
      $('article').fadeIn(1000);
      $('#category-filter option:eq(0)').text('-- Filter by Category --');
    }
    $('article.template').hide();
  });
};

articleView.manageMainNav = function() {
  $('.top-nav').on('click','.tab:eq(0)', function(){
    $('#articles').fadeIn(1000);
    $('#about').hide();
  });
  $('.top-nav').on('click','.tab:eq(1)', function(){
    $('#about').fadeIn(1000);
    $('#articles').hide();
  });

  $('.top-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.hamburgerToggle = function() {
  $('.icon-menu').on('click', function() {
    $('nav ul').toggle();
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.manageCategoryFilter();
  articleView.manageMainNav();
  articleView.setTeasers();
  articleView.hamburgerToggle();
});
