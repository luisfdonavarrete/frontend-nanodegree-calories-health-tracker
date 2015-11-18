var NUTRITIONIX_URL = "https://api.nutritionix.com/v1_1/search/",
    NUTRITIONIX_APP_ID = "1a450e10",
    NUTRITIONIX_APP_KEYS = "051abdd81592fbfe10e3e2ce44667643",
    ENTER_KEY = 13,
    myFirebaseRef = new Firebase("https://blistering-inferno-4995.firebaseio.com/");

var HealthApp = {
	Views: {},
	Models: {},
	Collections: {},
	Router: {}
};

$.fn.serializeForm = function () {
	var o = {};
	var a = this.serializeArray();

	var result;
	function formatItem(item) {
		var aux = "";
		aux = item.name.split("[", 2);
		aux[1] = aux[1].replace("]", "");
		return aux;
	}

	$.each(a, function () {
		result = formatItem(this);
		if (o.hasOwnProperty(result[0]) === false) {
			o[result[0]] = {};
		}
		o[result[0]][result[1]] = this.value;
	});
	return o;
};

$(document).ready(function () {

	HealthApp.Router.Instance = new HealthApp.Router();
	Backbone.history.start();

});