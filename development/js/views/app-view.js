var HealthApp = HealthApp || {};

(function ($) {

	'use strict';

	HealthApp.AppView = Backbone.View.extend({

		el: '#health-tracker-app',

		events: {
			'click .nav-tabs li': 'clickHandler'
		},

		clickHandler: function (e) {
			var $target = $(e.target);
			var $siblings = $target.parent().siblings();
			$siblings.removeClass('active');
			$target.parent().addClass('active');
		},

		render: function () {
			var view = new HealthApp.FoodDiaryView({ collection: HealthApp.foodCollection });
			view.render();
		}
	});
} (jQuery));