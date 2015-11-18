var HealthApp =  HealthApp || {};

(function () {
	
	'use strict';
	
	var firebaseFoodList = Backbone.Firebase.Collection.extend({
		model: HealthApp.FoodModel,
		url: 'https://blistering-inferno-4995.firebaseio.com/',
		autoSync: true
	});
	
	HealthApp.foodCollection = new firebaseFoodList();
	
}());