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
			maxPage: 10,
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
			var start = 0;
			var middle = Math.floor(this.paginationOptions.maxPage / 2);
			var end = 0;
			var pages = [];
			for (var index = 0; index < numPages; index++) {
				pages.push({
					'num': index + 1,
					'start': index * this.paginationOptions.itemsPerPage,
					'end': (index * this.paginationOptions.itemsPerPage) + this.paginationOptions.itemsPerPage,
					'active': ((index + 1) === activePage) ? 'active' : ''
				});
			}
			if ((activePage + 1) >= middle) {
				start = (activePage - middle) + 1;
				middle = activePage + 1;
			}
			end = middle + this.paginationOptions.gap + Math.floor(this.paginationOptions.maxPage / 2);
			if(end >= pages.length - 1){ 
				end = pages.length - 1;
			}
			var head = pages.slice(start, middle);
			var tail = pages.slice(middle + this.paginationOptions.gap, end);
			var result = head.concat({
				'num': '...',
				'start': 0,
				'end': 0,
				'active' : 'disabled'
			}).concat(tail);
			if (activePage > 1) {
				result.unshift({
					'num': '&laquo;',
					'start': pages[activePage - 2].start,
					'end': pages[activePage - 2].end,
					'active' : ''					
				});
			}
			result.push({
				'num': '&raquo;',
				'start': pages[activePage].start,
				'end': pages[activePage].end,
				'active' : ''
			});
			return result;
		},

	});
} ());