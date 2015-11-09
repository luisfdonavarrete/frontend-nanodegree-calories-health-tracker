HealthApp.Models.FoodModel = Backbone.Model.extend({
	
	defaults: {
		brand_id: "",
		brand_name: "",
		item_id: "",
		item_name: "",
		nf_calories: "",
		date: new Date(),
		form: false,
		firebaseID: null
	},
	
});