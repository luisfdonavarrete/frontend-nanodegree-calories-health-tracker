var NUTRITIONIX_URL = "https://api.nutritionix.com/v1_1/search/",
    NUTRITIONIX_APP_ID = "1a450e10",
    NUTRITIONIX_APP_KEYS = "051abdd81592fbfe10e3e2ce44667643",
    ENTER_KEY = 13;

var HealthApp = HealthApp || {};

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

// Create a function to kick off our BackboneFire app
function init() {
  // The data we are syncing from our remote Firebase database
  var app = new HealthApp.AppView();
}
// When the document is ready, call the init function
$(function() {
  init();
});