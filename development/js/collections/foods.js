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

		paginationOptions: {
			paginationStart: 0,
			paginationEnd: 10,
			itemsPerPage: 10,
			maxPages: 10,
			gap: 10,
			total: 0
		},

		url: function () {
			return NUTRITIONIX_URL + this.name;
		},

		parse: function (response) {
			var models = [];
			this.paginationOptions.total = (response.total_hits > 10000) ? 10000 : response.total_hits;
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
			var activePage = Math.floor(this.paginationOptions.paginationStart / this.paginationOptions.itemsPerPage) + 1;
			var numPages = Math.floor(this.paginationOptions.total / this.paginationOptions.itemsPerPage);
			var pages = [];
			
			for (var index = 0; index < numPages; index++) {
				pages.push({
					'num': index + 1,
					'start': index * this.paginationOptions.itemsPerPage,
					'end': (index * this.paginationOptions.itemsPerPage) + this.paginationOptions.itemsPerPage,
					'active': ((index + 1) === activePage) ? 'active' : ''
				});
			}

			var result = pages.slice(activePage - 1, activePage + this.paginationOptions.maxPages);

			if (activePage > 1) {
				result.unshift({
					'num': '&laquo;',
					'start': pages[activePage - 2].start,
					'end': pages[activePage - 2].end,
					'active': ''
				});
			}
			if (activePage < numPages) {
				result.push({
					'num': '&raquo;',
					'start': pages[activePage].start,
					'end': pages[activePage].end,
					'active': ''
				});
			}

			return result;
		},

	});
} ());