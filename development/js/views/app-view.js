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
			toggleTabs($target.parent(), $siblings, 'active');
		}		
	});
} (jQuery));