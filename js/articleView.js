var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var value = $(this).attr('data-category');
      console.log(value);
      var optionTag = '<option value="' + value + '">' + value + '</option>';
      console.log(optionTag);
      $('#category-filter').append(optionTag);
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

articleView.populateFilters();
console.log('articleView.populateFilters');
articleView.manageCategoryFilter();
console.log('articleView.manageCategoryFilter');
