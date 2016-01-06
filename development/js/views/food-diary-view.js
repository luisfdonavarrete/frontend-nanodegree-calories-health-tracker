var HealthApp = HealthApp || {};

(function () {

	'use strict';

	HealthApp.FoodDiaryView = Backbone.View.extend({

		template: _.template($("#food-diary-template").html()),

		events: {
			"click #add-item": "loadFood"
		},

		initialize: function () {
			this.modal = undefined;
			this.$content = $('#my-food-diary');
			this.listenToOnce(this.collection, 'sync', this.addAll);
			//this.listenTo(this.collection, 'add', this.addOne);
			//this.listenTo(this.collection, 'update', this.addAll);
			/*this.listenTo(this.collection, 'update', function () {
				console.log('UPDATE');
			});*/
		},

		updateCalories: function (item) {
			this.$el.find('.total').html("(" + this.collection.totalCaloriesToday() + ")");
		},

		render: function () {
			this.$content.html(this.$el.html(this.template()));
			return this;
		},

		addAll: function () {			
			this.$el.find("#selected-food-items").html('');
			var items = this.collection.todayItems();
			_.each(items, function (item) {
				this.addOne(item);
			}, this);
		},

		addOne: function (item) {
			var foodItem = new HealthApp.FoodItemView({
				model: item
			});
			//this.updateCalories();
			this.$el.find('#selected-food-items').append(foodItem.render().el);
		},

		loadFood: function (e) {
			e.preventDefault();
			var view = new HealthApp.SearchModalView();
			this.toggleAddItem();
			this.modal = new Backbone.BootstrapModal({
				content: view,
				title: 'Food Search',
				animate: true
			});
			this.modal.open(this.addFoodItem.bind(this));
			this.modal.on('cancel', function () {
				this.toggleAddItem();
			}, this);
		},

		toggleAddItem: function () {
			this.$el.find('#add-item').toggleClass('active');
		},

		addFoodItem: function () {
			var form = this.modal.$el.find("#food-form").serializeForm();
			this.toggleAddItem();
			_.each(form, function (item) {
				if (item.checked !== undefined) {
					delete item.checked;
					this.collection.create(item);
				}
			}, this);
		}
	});
} ());