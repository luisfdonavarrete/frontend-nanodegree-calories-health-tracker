HealthApp.Router = Backbone.Router.extend({
	
	initialize: function(options){
		this.initialValues = options.initialValues || [];
	},

	routes: {
		'home': 'home',
		'search': 'search',
		'*path': 'home'
	},

	home: function(){
		var view = new HealthApp.Views.AppView(this.initialValues);
	},
	
	
});