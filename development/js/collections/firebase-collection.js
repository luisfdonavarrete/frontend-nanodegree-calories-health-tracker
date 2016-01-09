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
			var aux;
			return this.filter(function(item){
				aux = new Date(item.attributes.date);
				return this.dateFormat(aux) === this.todayDate;
			}, this);
		},

		totalCaloriesToday: function () {
			var foodItems = this.todayItems();
			var caloriesTotal = _.reduce(foodItems, function (memo, value, index, list) {
				return memo + parseFloat(value.attributes.nf_calories);
			}, 0, this);
			return caloriesTotal.toFixed(2);
		},
		
		getItemGroupedByDay: function () {
			var aux = [],
				result = [];
			
			this.each(function (item) {
				aux.push({
					'date': this.dateFormat(new Date(item.get('date'))),
					'value': item.get('nf_calories')
				});
			}, this);
			aux = _.groupBy(aux, 'date');
			var value = 0;
			_.each(aux, function (item, i) {
				value = _.reduce(item, function (memo, num) {
					return memo + parseFloat(num.value);
				}, 0);
				result.push({ 'date': i, 'value': value });
			});
			return result;
		}

	});

	HealthApp.foodCollection = new FirebaseFoodList();

} ());