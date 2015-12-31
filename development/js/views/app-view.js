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
			this.toggleTabs($target.parent(), $siblings, 'active');
			$target = $($target.attr('href'));
			$siblings = $target.siblings();
			this.toggleTabs($target, $siblings, 'active in');
		},
		
		toggleTabs: function ($active, $other, classes) {
			$other.removeClass(classes);
			$active.addClass(classes);
		}		
	});
} (jQuery));