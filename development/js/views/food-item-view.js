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
		this.$el.html( this.template(this.model.attributes) );
		return this;
	},
	
	deleteFoodItem: function(){
		var self = this;
		var foodItemRef = new Firebase(myFirebaseRef + this.model.attributes.firebaseID);
		foodItemRef.remove(function(){
			self.model.destroy();
			self.remove();
		});
		
	}
});