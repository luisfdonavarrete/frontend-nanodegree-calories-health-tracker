var HealthApp = HealthApp || {};

(function ($) {

	'use strict';

	HealthApp.AppView = Backbone.View.extend({

		el: '#health-tracker-app',

		initialize: function () {
			this.render();
		},

		render: function () {
			var view = new HealthApp.FoodDiaryView({ collection: HealthApp.foodCollection });
			view.render();
		}
	});
} (jQuery));