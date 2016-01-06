var HealthApp = HealthApp || {};

/*$target = $($target.attr('href'));
$siblings = $target.siblings();
this.toggleTabs($target, $siblings, 'active in');*/

(function () {
	HealthApp.Router = Backbone.Router.extend({


		initialize: function () {
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
			var $target = this.appView.$el.find('#my-food-diary');
			var $siblings = $target.siblings();
			toggleTabs($target, $siblings, 'in active');			
		},

		history: function () {
			var $target = this.appView.$el.find('#history');
			var $siblings = $target.siblings();
			toggleTabs($target, $siblings, 'in active');
		}
	});
} ());
