(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    console.log('ran request repos');
    $.ajax({
      url: 'github/user/repos' +
            '?per_page=100' +
            '&sort=updated',
      type: 'GET',
      // headers: {'Authorization': 'token ' + githubToken},
      success: function(data) {
        repos.all = data;
      }
    }).done(callback);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
