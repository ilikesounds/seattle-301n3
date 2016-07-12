(function(module) {
  var articlesController = {};

  Article.createTable(); // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Answer: Upon execution of article by id route, articlesController.loadbyId is invoked with the context object and the articlesController.index is passed in as the next method callback. articleData is defined as a function with an article parameter. In that function an article propertyy is created and assigned to the context object and assigned the current value of the article parameter being passed in. The next argumenet is added to the end of the function to be invoked when called. ARticle.findWhere takes three arguements and runs a query on the locally established SQL table and searches by the specified ID provided in the ctx.params.id and the articleData function as a callback with the data retreived passed into it.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };
    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Answer: Upon execution of article by id route, articlesController.loadbyId is invoked with the context object and the articlesController.index is passed in as the next method callback. authorData is defined as a function with an articlesByAuthor parameter. In that function an articles property is created and assigned to the context object and assigned the current value of the articlesByAuthor parameter being passed in. The next argument is added to the end of the function to be invoked when called. ARticle.findWhere takes three arguements with a string concatanation and runs a query on the locally established SQL table and searches by the specified authorName provided in the ctx.params.authorName.replace concatanator and the authorData function as a callback with the data retreived passed into it.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Answer: Upon execution of category route, .loadByCategory() method is invoked with the context object passed as well as articlesController.index as an arguement. categoryData is defined as a function with a parameter of articlesInCategory. The articles property is created on the context object and assigned the current value of articlesInCategory. Otherwise Article.findWhere is invoked retreiving all article data by category with the categoryData function as a callback and the data retreived by SQL query passed into it.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // Answer: Upon execution of home route, .loadAll() method is invoked with the context object passed as well as articlesController.index as an arguement. articleData is defined as a function with a parameter of allArticles. The articles property is created on the context object and assigned the current value of Article.all. If Article.all.length is greater than zero, then the ctx.articles is assigned the current value of Article.all and the function articlesController.index is invoked by the next method. Otherwise Article.fetchAll is invoked retreiving all article data with the articleData function as a callback and the data retreived passed into it.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
