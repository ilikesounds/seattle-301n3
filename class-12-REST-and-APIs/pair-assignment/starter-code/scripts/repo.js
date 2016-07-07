// (function(module) {
var repos = {};

repos.all = [];

repos.requestRepos = function(callback) {
  $.ajax({
    url: 'https://api.github.com/users/ilikesounds/repos' + '?per_page=10&sort=updated',
    type: 'GET',
    headers: {
      'authorization': githubKey
    },
    success: function(data) {
      data.forEach(function(ele) {
        repos.all.push(ele);
      });
    }
  }).done(callback);
};
// DONE: Model method that filters the full collection for repos with a particular attribute.
// You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
repos.with = function(attr) {
  return repos.all.filter(function(repo) {
    return repo[attr];
  });
};
// module.repos = repos;
// })(window);
