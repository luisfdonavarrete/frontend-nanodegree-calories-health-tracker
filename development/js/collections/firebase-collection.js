var HealthApp =  HealthApp || {};

(function () {
	
	'use strict';
	
	var firebaseFoodList = Backbone.Firebase.Collection.extend({
		model: HealthApp.FoodModel,
		url: function(){
			return new Firebase('https://blistering-inferno-4995.firebaseio.com/');
		},
		autoSync: true,
		
		todayItems: function () {
			var startTime = moment(new Date(moment().format("YYYY/MM/DD") + " 00:00:00").getTime()).unix();
			var endTime = moment(new Date(moment().format("YYYY/MM/DD") + " 23:59:59").getTime()).unix();
			return this.filter(function(item){
				return item.attributes.date >= startTime && item.attributes.date <= endTime;
			});			
		},
		
		totalCaloriesToday: function () {
			var foodItems = this.todayItems();
			var caloriesTotal = _.reduce(foodItems, function (memo, value, index, list) {				
				return memo + parseFloat(value.attributes.nf_calories);
			}, 0, this);
			return caloriesTotal.toFixed(2);
		}
		
	});
	
	HealthApp.foodCollection = new firebaseFoodList();
	
}());