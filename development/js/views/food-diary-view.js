var HealthApp = HealthApp || {};

(function () {

	'use strict';

	HealthApp.FoodDiaryView = Backbone.View.extend({

		template: _.template($("#home-template").html()),
		
		events: {
			"click #add-item": "loadFood"
		},

		initialize: function () {
			var self = this;
			this.modal = undefined;
			this.$addItem = self.$("#add-item"); /*TODO: review if it works*/
			this.$content = $('#content'); /*TODO: review if it works*/
			this.listenTo(this.collection, 'sync', this.render);
			this.listenTo(this.collection, 'add', this.renderFoodItem);
		},

		render: function () {
			var items = this.collection.todayItems();
			this.$content.html(this.$el.html(this.template()));
			_.each(items, function (item) {
				this.renderFoodItem(item);
			}, this);
			return this;
		},

		renderFoodItem: function (item) {
			var foodItem = new HealthApp.FoodItemView({
				model: item
			});
			this.$el.find("#selected-food-items").append(foodItem.render().el);
		},

		loadFood: function (e) {
			e.preventDefault();
			this.$addItem.toggleClass("active");
			var view = new HealthApp.SearchModalView();
			this.modal = new Backbone.BootstrapModal({
				content: view,
				title: 'Food Search',
				animate: true
			});
			this.modal.open(this.addFoodItem.bind(this));
		},

		addFoodItem: function () {
			this.$addItem.toggleClass("active");
			var form = this.modal.$el.find("#food-form").serializeForm();

			_.each(form, function (item) {
				if (item.checked !== undefined) {
					delete item.checked;
					this.collection.create(item);
				}
			}, this);
		}
	});
} ());