var HealthApp = HealthApp || {};

(function () {
	
	'use strict';
	
	HealthApp.FoodList = Backbone.Collection.extend({

		model: HealthApp.FoodModel,

		initialize: function (options) {
			if (options !== undefined) {
				this.name = options.name;
			}
		},

		url: function () {
			var queryUrl = NUTRITIONIX_URL +
				this.name +
				"?fields=item_name,brand_name,item_id,brand_id,nf_calories" +
				"&appId=" + NUTRITIONIX_APP_ID +
				"&appKey=" + NUTRITIONIX_APP_KEYS;
			return queryUrl;
		},

		parse: function (response) {
			var models = _.map(response.hits, function (item) {
				return {
					brand_id: item.fields.brand_id,
					brand_name: item.fields.brand_name,
					item_id: item.fields.item_id,
					item_name: item.fields.item_name,
					nf_calories: item.fields.nf_calories
				};
			});
			return models;
		}
	});
}());

