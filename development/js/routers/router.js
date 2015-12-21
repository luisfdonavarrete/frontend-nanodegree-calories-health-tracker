var HealthApp = HealthApp || {};

(function () {
	HealthApp.Router = Backbone.Router.extend({
		
		initialize: function(){
			this.homeView = new HealthApp.AppView();
			this.historyView = new HealthApp.HistoryFoodView(); 
		},

		routes: {
			"home": "home",
			"history": "history",
			"*path": "home"
		},

		home: function () {
			this.homeView.render();
		},

		history: function () {
			$('#content').html(this.historyView.render().$el.html());
		}
	});
} ());
