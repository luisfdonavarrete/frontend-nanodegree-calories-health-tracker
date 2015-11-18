var HealthApp = HealthApp || {};

(function () {
	HealthApp.FoodModel = Backbone.Model.extend({

		defaults: {
			brand_id: "",
			brand_name: "",
			item_id: "",
			item_name: "",
			nf_calories: "",
			date: moment(new Date().getTime()).unix(),
			form: false,
			firebaseID: null
		}
	});
})();
