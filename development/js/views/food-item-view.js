var HealthApp = HealthApp || {};

(function ($) {
	HealthApp.FoodItemView = Backbone.View.extend({

		tagName: "li",

		className: "list-group-item",
		
		events: {
			"click .delete": "deleteFoodItem"
		},

		initialize: function () {
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'change', this.render);
		},

		template: _.template($("#meal-item-template").html()),

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},

		deleteFoodItem: function () {
			this.model.destroy();
		}
	});
} (jQuery));