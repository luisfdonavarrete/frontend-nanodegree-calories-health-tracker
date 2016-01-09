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
			this.formatedData = [];
			this.listenTo(this.collection, 'add', this.render);
		},

		render: function () {
			var self = this;
			var dataset = this.collection.getItemGroupedByDay();
			self.d3.selectAll("*").remove();
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
				.rangeRound([this.PADDING, this.WIDTH - this.PADDING * 2])
				.nice(d3.time.month);
				
			dataset.push({
				'date': d3.time.format("%Y-%m-%d")(self.xScaleTime.domain()[0]),
				'value' : 0
			});
			
			dataset = _.sortBy(dataset, function(item){ return item.date; });
				
			this.xAxis = d3.svg.axis()
				.scale(this.xScaleTime)
				.orient("bottom");

			this.yAxis = d3.svg.axis()
				.scale(this.yScale)
				.orient("left");
			
			var line = d3.svg.line()
				.x(function (d) { return self.xScaleTime(new Date(d.date)); })
				.y(function (d) { return self.yScale(d.value); }); 
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
				})
				.attr("fill", "#5BC0DE")
				.attr("stroke", "#204D74")
				.attr("stroke-width", function (d) {
					return self.rScale(d.value);
				});
			this.d3.append("path")
				.datum(dataset)
				.attr("class", "line")
				.attr("d", line);
			this.d3.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + (this.HEIGHT - this.PADDING) + ")")
				.call(this.xAxis);

			this.d3.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(" + this.PADDING + ",0)")
				.call(this.yAxis);
		}
		
	});
} (jQuery));

