HealthApp.Views.FoodDiaryView = Backbone.View.extend({

	template: _.template($("#home-template").html()),

	initialize: function (callback) {
		var self = this;
		this.modal = undefined;
		this.$addItem = self.$("#add-item");
		this.listenTo(self.collection, 'add', self.render);
		var startTime = moment(new Date(moment().format("YYYY/MM/DD") + " 00:00:00").getTime()).unix();
		var endTime = moment(new Date(moment().format("YYYY/MM/DD") + " 23:59:59").getTime()).unix();

		myFirebaseRef.orderByChild("date").startAt(startTime).endAt(endTime).once("value", function (snapshot) {
			var initialValues = _.map(snapshot.val(), function (item, id) {
				item.firebaseID = id;
				return item;
			});
			self.collection = new HealthApp.Collections.FoodList(_.map(initialValues, function (item) {
				return new HealthApp.Models.FoodModel(item);
			}));
			typeof callback === "function" && callback(self);
		});
	},

	render: function () {
		this.$el.html(this.template());
		this.collection.each(function (item) {
			this.renderFoodItem(item);
		}, this);
		return this;
	},

	renderFoodItem: function (item) {
		var foodItem = new HealthApp.Views.FoodItemView({
			model: item
		});
		this.$el.find("#selected-food-items").append(foodItem.render().el);
	},

	events: {
		"click #add-item": "loadFood"
	},

	loadFood: function (e) {
		e.preventDefault();
		this.$addItem.toggleClass("active");
		var view = new HealthApp.Views.SearchModalView();
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

		var selectedItems = [];

		_.each(form, function (item) {
			if (item.checked !== undefined) {
				delete item.checked;
				selectedItems.push(new HealthApp.Models.FoodModel(item));
			}
		});

		var pushRef;

		_.each(selectedItems, function (item) {
			pushRef = myFirebaseRef.push(item.attributes);
			item.attributes.firebaseID = pushRef.key();
			this.collection.add(item);
		}, this);
	}

});