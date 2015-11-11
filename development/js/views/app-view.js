HealthApp.Views.AppView = Backbone.View.extend({

	el: '#health-tracker-app',
	
	initialize: function(initialListFood){
		this.modal = undefined;
		this.$list = this.$("#selected-food-items");
		this.collection = new HealthApp.Collections.FoodList(_.map(initialListFood, function(item){
			return new HealthApp.Models.FoodModel(item);
		}));
		this.listenTo( this.collection, 'add', this.renderFoodItem );
		this.render();
	},
	
	render: function(){
		this.collection.each(function(item){
			this.renderFoodItem(item);
		}, this);
	},
	
	renderFoodItem: function(item){
		var foodItem = new HealthApp.Views.FoodItemView({
			model: item
		});
		this.$list.append(foodItem.render().el);
	},
	
	events:{
		"click .nav a[href*=#]:not([href=#])": "test"
	},
	
	test: function (e) {
		location.hash = e.currentTarget.hash;
	}

});