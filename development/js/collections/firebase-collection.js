var HealthApp = HealthApp || {};

(function () {

	'use strict';

	var FirebaseFoodList = Backbone.Firebase.Collection.extend({
		
		initialize: function () {
			this.dateFormat = d3.time.format("%Y-%m-%d");
			this.todayDate = this.dateFormat(new Date());	
		},		

		model: HealthApp.FoodModel,

		url: function () {
			return new Firebase('https://blistering-inferno-4995.firebaseio.com/');
		},

		todayItems: function () {
			console.log("AQUI");
			return this.filter(function(item){
				return this.dateFormat(item.attributes.date) === this.todayDate;
			}, this);
		},

		totalCaloriesToday: function () {
			var foodItems = this.todayItems();
			var caloriesTotal = _.reduce(foodItems, function (memo, value, index, list) {
				return memo + parseFloat(value.attributes.nf_calories);
			}, 0, this);
			return caloriesTotal.toFixed(2);
		}

	});

	HealthApp.foodCollection = new FirebaseFoodList();

} ());