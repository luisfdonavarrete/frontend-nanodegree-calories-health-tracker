var HealthApp = HealthApp || {};

(function ($) {

	'use strict';

	HealthApp.SearchModalView = Backbone.View.extend({

		initialize: function () {
			this.collection = null;
		},

		template: _.template($('#search-modal-view-template').html()),

		events: {
			'keypress #search-input': 'getFoodItems',
			'click .pagination li a': 'paginationClick'
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		getFoodItems: function (e) {
			var input = this.$el.find('#search-input');
			if (e.which === ENTER_KEY && input.val().trim()) {
				e.preventDefault();
				var name = input.val();
				this.collection = new HealthApp.FoodList({ name: name });
				this.updateCollection({
					paginationEnd: 8,
					itemsPerPage: 8,
					paginationStart: 0
				});
			}
		},

		updateCollection: function (config) {
			this.collection.paginationOptions = _.extend(this.collection.paginationOptions, config);
			this.collection.fetch({
				data: {
					results: this.collection.paginationOptions.paginationStart + ":" + this.collection.paginationOptions.paginationEnd,
					fields: "item_name,brand_name,item_id,brand_id,nf_calories",
					order: 'asc',
					appId: NUTRITIONIX_APP_ID,
					appKey: NUTRITIONIX_APP_KEYS,
				},
				success: this.addAll.bind(this)
			});
		},

		addAll: function (params) {
			var $list = this.$el.find('#food-list'),
				$pagination = this.$el.find('.pagination');

			$pagination.html('');
			$list.html('');
			if (params.length > 0) {
				params.forEach(function (item) {
					this.addOne(item, $list);
				}, this);
				this.renderPagination();
			}
			else {
				var $message = $('<div></div>');
				$message.addClass('text-danger text-center');
				$message.html('No Items Found');
				$list.html($message);
			}
		},

		addOne: function (item, $list) {
			item.attributes.form = true;
			var foodView = new HealthApp.FoodItemView({ model: item });
			$list.append(foodView.render().el);
		},

		paginationClick: function (e) {
			var $target = $(e.currentTarget);
			if (!$target.parent().hasClass('active') && !$target.parent().hasClass('disabled')){
				var config = {
					paginationStart: $target.data('start'),
					paginationEnd: $target.data('end')
				};
				this.updateCollection(config);
			}
		},

		renderPagination: function () {
			var linkInfo = this.collection.paginationLinks();
			var $pagination = this.$el.find('.pagination');
			linkInfo.forEach(function (value, index) {
				$pagination.append('<li class="' + value.active + '"><a href="#" data-start="' + value.start + '" data-end="' + value.end + '">' + value.num + '</a></li>');
			});
		}
	});
} (jQuery));