var HealthApp = HealthApp || {};

(function($){
	
	'use strict';
	
	HealthApp.AppView = Backbone.View.extend({

	el: '#health-tracker-app',
	
	initialize: function(){
		this.render();
	},
	
	render: function(){
		new HealthApp.FoodDiaryView({ collection: HealthApp.foodCollection });
	}
	
	/* */
	/*
		myFirebaseRef.orderByChild("date").startAt(startTime).endAt(endTime).once("value", function (snapshot) {
			var initialValues = _.map(snapshot.val(), function (item, id) {
				item.firebaseID = id;
				return item;
			});
			self.collection = new HealthApp.Collections.FoodList(_.map(initialValues, function (item) {
				return new HealthApp.Models.FoodModel(item);
			}));
			typeof callback === "function" && callback(self);
		});*/
	/**/
});	
}(jQuery));