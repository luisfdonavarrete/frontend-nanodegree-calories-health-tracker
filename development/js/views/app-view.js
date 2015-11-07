HealthApp.Views.AppView = Backbone.View.extend({

	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: '#health-tracker-app',
	
	initialize: function(initialListFood){
		this.modal = undefined;
		this.$list = this.$("#selected-food-items");
		this.collection = new HealthApp.Collections.FoodList(_.map(initialListFood, function(item){
			return new HealthApp.Models.FoodModel(item);
		}));
		this.$addItem = this.$("#add-item");
		this.listenTo( this.collection, 'add', this.renderFoodItem );
		this.render();
	},
	
	render: function(){
		var foodItem = null;
		this.collection.each(function(item){
			this.renderFoodItem(item);
		}, this);
	},
	
	renderFoodItem: function(item){
		foodItem = new HealthApp.Views.FoodItemView({
			model: item
		});
		this.$list.append(foodItem.render().el);
	},
	
	events:{
		'click #add-item': 'loadFood'
	},

	loadFood: function( e ) {
		e.preventDefault();
		this.$addItem.toggleClass("active");
		var view = new HealthApp.Views.SearchModalView();
		this.modal = new Backbone.BootstrapModal({
			content: view,
			title: 'Food Search',
			animate: true
		});
		this.modal.open(this.addFoodItem.bind(this));
	},
	
	addFoodItem:  function(){
		this.$addItem.toggleClass("active");
		var form  = this.modal.$el.find("#food-form").serializeForm();
		var selectedItem = _.filter(form, function(item){
			if(item.checked){
				return {
					brand_name: item.brand_name,
					item_id: item.item_id,
					item_name: item.item_name,
					nf_calories: item.nf_calories
				};
			}
		}, this);
		
		_.each(selectedItem, function(item){
			this.collection.add(new HealthApp.Models.FoodModel(item));
		}, this);
	}

});