var HealthApp = HealthApp || {};

(function () {
	var Router = Backbone.Router.extend({
		
		
		initialize: function(){	
			this.appView = new HealthApp.AppView();
			this.foodDiaryView = new HealthApp.FoodDiaryView({ collection: HealthApp.foodCollection });
			this.foodDiaryView.render();
			this.foodDiaryView.delegateEvents(); 
			this.historyView = new HealthApp.HistoryFoodView({ collection: HealthApp.foodCollection });
		},

		routes: {
			"my-food-diary": "myFoodDiary",
			"history": "history",
			"*path": "myFoodDiary"
		},

		myFoodDiary: function () {

		},

		history: function () {
			//this.historyView.render();
		}
	});
	
	HealthApp.Router = new Router();
} ());
