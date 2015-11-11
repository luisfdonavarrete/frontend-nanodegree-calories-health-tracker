HealthApp.Router = Backbone.Router.extend({

	initialize: function () {
		var self = this;
		var startTime = moment(new Date(moment().format("YYYY/MM/DD") + " 00:00:00").getTime()).unix();
		var endTime = moment(new Date(moment().format("YYYY/MM/DD") + " 23:59:59").getTime()).unix();
		this.initialValues = [];

		myFirebaseRef.orderByChild("date").startAt(startTime).endAt(endTime).once("value", function (snapshot) {
			var initialValues = _.map(snapshot.val(), function (item, id) {
				item.firebaseID = id;
				return item;
			});
			self.initialValues = initialValues;
		},
		function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	},

	routes: {
		"home": "home",
		"search": "search",
		"*path": "home"
	},

	home: function () {
		console.log(this);
		new HealthApp.Views.AppView();
		var view = new HealthApp.Views.FoodDiaryView(this.initialValues);
		$("#content").html(view.render().el);
	},

	search: function () {
		$("#content").html("Parece qie vael");
	},


});