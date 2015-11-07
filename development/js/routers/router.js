HealthApp.Router = Backbone.Router.extend({

	routes: {
		'home': 'home',
		'search': 'search',
		'*path': 'home'
	},

	home: function(){
		var initial = [
			{
				brand_id: "Brand Id One",
				brand_name: "Brand Name One",
				item_id: "Item Id One",
				item_name: "Item Name One",
				nf_calories: "20",
				date: new Date()
			},
			{
				brand_id: "Brand Id Two",
				brand_name: "Brand Name Two",
				item_id: "Item Id Two",
				item_name: "Item Name Two",
				nf_calories: "50",
				date: new Date()
			}
		]
		var view = new HealthApp.Views.AppView(initial || []);
	},
	
	
});