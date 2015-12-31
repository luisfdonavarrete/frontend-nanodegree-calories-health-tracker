var HealthApp = HealthApp || {};

(function ($) {

	'use strict';

	HealthApp.HistoryFoodView = Backbone.View.extend({

		el: "svg",

		initialize: function () {
			this.WIDTH = 760;
			this.HEIGHT = 250;
			this.PADDING = 30;
			this.d3 = d3.select(this.el);
			this.listenTo(this.collection, 'sync', this.formatData);
		},

		render: function (dataset) {
			var self = this;
			this.d3.attr("width", this.WIDTH)
				.attr("height", this.HEIGHT);
			this.d3.selectAll("circle")
				.data(dataset)
				.enter()
				.append("circle")
				.attr("cx", function (d) {
					return self.xScaleTime(new Date(d.date));
				})
				.attr("cy", function (d) {
					return self.yScale(d.value);
				})
				.attr("r", function (d) {
					return self.rScale(d.value);
				});
			this.d3.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (this.HEIGHT - this.PADDING) + ")")
				.call(this.xAxis);

			this.d3.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(" + this.PADDING + ",0)")
				.call(this.yAxis);
		},

		formatData: function (response) {
			var data = [];
			var format = d3.time.format("%Y-%m-%d");
			response.each(function (item) {
				data.push({
					'date': format(new Date(item.get('date'))),
					'value': item.get('nf_calories')
				});
			});
			data = _.groupBy(data, 'date');
			var result = []
			var value = 0
			_.each(data, function (item, i) {
				value = _.reduce(item, function (memo, num) {
					return memo + parseFloat(num.value);
				}, 0);
				result.push({ 'date': i, 'value': value });
			});
			this.initializeChartValues(result);
		},

		initializeChartValues: function (dataset) {
			this.yScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function (d) { return d.value; })])
				.range([this.HEIGHT - this.PADDING, this.PADDING]);

			this.rScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function (d) { return d.value; })])
				.range([2, 5]);

			this.xScaleTime = d3.time.scale()
				.domain(d3.extent(dataset, function (d) {
					return new Date(d.date);
				}))
				.rangeRound([this.PADDING, this.WIDTH - this.PADDING * 2]);
			this.xAxis = d3.svg.axis()
				.scale(this.xScaleTime)
				.orient("bottom");

			this.yAxis = d3.svg.axis()
				.scale(this.yScale)
				.orient("left")
				.ticks(5);
			this.render(dataset);
		},

	});
} (jQuery));

