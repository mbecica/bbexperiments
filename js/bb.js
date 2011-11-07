$(function() {
  window.RedditModel = Backbone.Model.extend({
    defaults: {
      redditApi: "http://www.reddit.com/.json?jsonp=?"
    },
    loadData: function() {
      var self = this;
      $.getJSON(self.get('redditApi'), function(data) {
        self.set({
          'data':data.data.children
          });
      });
    }
  });
  
  window.reddit = new RedditModel();

  window.HomeView = Backbone.View.extend({
    el: $('#posts'),
    className: 'post',
    template:_.template($('#reddit-template').html()),
    initialize: function() {
      this.model.bind("change:data", this.render, this);
    },
    render: function() {
      var self = this;
      var html = '';
      _.each(this.model.get('data'), function(o) {
        html += self.template(o.data);
      });
      $(self.el).html(html);
      return this;
    }
  });
  
  var homeView = new HomeView({
    'model': reddit
  });

  reddit.loadData();
});
