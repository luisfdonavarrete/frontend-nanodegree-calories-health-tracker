var HealthApp = HealthApp || {};

(function ($) {

	'use strict';

	HealthApp.AppView = Backbone.View.extend({

		template: _.template($('#total-template').html()),

		el: '#health-tracker-app',

		initialize: function () {
			this.$total = this.$('.total');
			this.render();
		},

		render: function () {
			var collection = HealthApp.foodCollection;
			this.$total.html(this.template({
				'totalDailyCalories': collection.totalCaloriesToday()
			}));
			new HealthApp.FoodDiaryView({ collection: collection });
		}
	});
} (jQuery));