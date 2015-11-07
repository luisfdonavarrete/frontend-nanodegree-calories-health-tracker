HealthApp.Views.SearchModalView = Backbone.View.extend({
	
	events: {
		"keypress #search-input": "getFoodItems"	
	},
	
	template: _.template($("#search-modal-view-template").html()),
	
	render: function(){
		this.$el.html(this.template());
		return this;
	},
	
	getFoodItems: function(e){
		var input = this.$el.find("#search-input");
		if(e.which === ENTER_KEY && input.val().trim()){
			e.preventDefault();
			var name = input.val();
			var foodList = new HealthApp.Collections.FoodList({name: name});
			foodList.fetch({
				success: this.renderMovies.bind(this)
			});
		}		
	},
	
	renderMovies: function(foodList) {
		var self = this,
		    model,
		    foodView,
		    list = this.$el.find("#food-list");
		
		list.html("");
		foodList.forEach(function(item){
			item.attributes.form = true;
			foodView = new HealthApp.Views.FoodItemView({model: item});
			list.append(foodView.render().el);
		});
	}
	
});