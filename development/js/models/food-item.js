var HealthApp = HealthApp || {};

(function () {
	HealthApp.FoodModel = Backbone.Model.extend({

		urlRoot: 'https://blistering-inferno-4995.firebaseio.com/',
		

		defaults: {
			brand_id: '',
			brand_name: '',
			item_id: '',
			item_name: '',
			nf_calories: '',
			date: (new Date()).toString(),
			form: false
		}
	});
})();
