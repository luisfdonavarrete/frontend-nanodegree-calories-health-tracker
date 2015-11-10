HealthApp.Views.AppView = Backbone.View.extend({

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
		console.log(form);
				
		var selectedItems = [];
		
		_.each(form, function (item) {
			if(item.checked !== undefined){
				delete item.checked;
				selectedItems.push(new HealthApp.Models.FoodModel(item));
			}		
		});
		
		var pushRef;
		
		_.each(selectedItems, function(item){
			pushRef = myFirebaseRef.push(item.attributes);
			item.attributes.firebaseID = pushRef.key();
			this.collection.add(item);
		},this);
	}

});