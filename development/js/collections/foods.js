var HealthApp = HealthApp || {};

(function () {

	'use strict';

	HealthApp.FoodList = Backbone.Collection.extend({

		model: HealthApp.FoodModel,

		initialize: function (options) {
			if (options !== undefined) {
				this.name = options.name;
			}
		},

		queryOptions: {
			paginationStart: 0,
			paginationEnd: 10,
			itemsPerPage: 10,
			maxPage: 10,
			total: 0,
			activePage: 0
		},

		url: function () {
			return NUTRITIONIX_URL + this.name;
		},

		parse: function (response) {
			var models = [];
			this.queryOptions.total = (response.total_hits > 10000) ? 10000 : response.total_hits;
			_.each(response.hits, function (item) {

				models.push({
					brand_id: item.fields.brand_id,
					brand_name: item.fields.brand_name,
					item_id: item.fields.item_id,
					item_name: item.fields.item_name,
					nf_calories: item.fields.nf_calories
				});
			});

			return models;
		},

		paginationLinks: function () {
			var numPages = Math.floor(this.queryOptions.total / this.queryOptions.itemsPerPage);
			var pages = [];
			for (var index = 0; index < numPages; index++) {
				pages.push({
					'num': index + 1,
					'start': index * this.queryOptions.itemsPerPage,
					'end': (index * this.queryOptions.itemsPerPage) + this.queryOptions.itemsPerPage
				});
			}
			var head = pages.slice(0, this.queryOptions.maxPage / 2);
			var tail = pages.slice( numPages - (this.queryOptions.maxPage / 2), pages.length - 1);
			var result = head.concat({
				'num': '...',
				'start': 0,
				'end': 0
			}).concat(tail);
			return result;
		},

	});
} ());