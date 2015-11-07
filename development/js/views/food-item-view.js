HealthApp.Views.FoodItemView = Backbone.View.extend({
	
	tagName : "li",
	
	className : "list-group-item",
	
	initialize: function(option){
		this.model = option.model
	},
	
	events: {
		"click .delete": "deleteFoodItem"
	},
	
	template : _.template($("#meal-item-template").html()),
	
	render: function() {
		//this.el is what we defined in tagName. use $el to get access to jQuery html() function
		this.$el.html( this.template(this.model.attributes) );
		return this;
	},
	
	deleteFoodItem: function(){
		this.model.destroy();
		this.remove();
	}
});