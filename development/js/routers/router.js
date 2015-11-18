var HealthApp = HealthApp || {};

(function () {
	HealthApp.Router = Backbone.Router.extend({

	routes: {
		"home": "home",
		"history": "history",
		"*path": "home"
	},

	home: function () {
		new HealthApp.AppView();
		/*var view = new HealthApp.FoodDiaryView(function (element) {
			$("#content").html(element.render().el);	
		});	*/	
	},

	history: function () {
		var view = new HealthApp.Views.HistoryFoodView(function (element) {
			console.log("sdfsdfs");
			$("#content").html(element.render().el);
		});		
	}
});	
}());
