var HealthApp =  HealthApp || {};

(function () {
	
	'use strict';
	
	var firebaseFoodList = Backbone.Firebase.Collection.extend({
		model: HealthApp.FoodModel,
		url: function(){
			return new Firebase('https://blistering-inferno-4995.firebaseio.com/');
		},
		autoSync: true,
		
		today: function () {
			var startTime = moment(new Date(moment().format("YYYY/MM/DD") + " 00:00:00").getTime()).unix();
			var endTime = moment(new Date(moment().format("YYYY/MM/DD") + " 23:59:59").getTime()).unix();
			return this.filter(function(item){
				return item.attributes.date >= startTime && item.attributes.date <= endTime;
			});			
		}
		
	});
	
	HealthApp.foodCollection = new firebaseFoodList();
	
}());