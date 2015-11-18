var HealthApp = HealthApp || {};

(function ($) {

	'use strict';

	HealthApp.SearchModalView = Backbone.View.extend({

		template: _.template($("#search-modal-view-template").html()),

		events: {
			"keypress #search-input": "getFoodItems"
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		getFoodItems: function (e) {
			var input = this.$el.find("#search-input");
			if (e.which === ENTER_KEY && input.val().trim()) {
				e.preventDefault();
				var name = input.val();
				var foodList = new HealthApp.FoodList({ name: name });
				foodList.fetch({
					success: this.renderFoodItems.bind(this)
				});
			}
		},

		renderFoodItems: function (foodList) {
			var self = this,
				model,
				foodView,
				list = this.$el.find("#food-list");

			list.html("");
			foodList.forEach(function (item) {
				item.attributes.form = true;
				foodView = new HealthApp.FoodItemView({ model: item });
				list.append(foodView.render().el);
			});
		}
	});
} (jQuery));