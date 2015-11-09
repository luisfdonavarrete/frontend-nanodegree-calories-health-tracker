$.fn.serializeForm = function(){
	var o = {};
	var a = this.serializeArray();
	
	var result;
	function formatItem(item){
		var aux = "";
		aux = item.name.split("[",2);
		aux[1] =  aux[1].replace("]", "");
		return aux;
	}
	
	$.each(a, function() {
		result = formatItem(this);		
		if (o[result[0]] !== undefined) {
			o[result[0]][result[1]] = this.value;
		}
		else{
			o[result[0]] = {};
		}
	});
	return o;
};

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

$(document).ready(function(){	
	var actualDate = (new Date()).toISOString().slice(0,10).replace(/-/g,"/");
	var startTime = Date.parse(actualDate + " 00:00:00") / 1000;
	var endTime = Date.parse(actualDate + " 23:59:59") / 1000;
	
	myFirebaseRef.orderByChild("date").startAt(endTime).once("value", function(snapshot) {
		var initialValues = _.map(snapshot.val(), function(item,id){
			item.firebaseID = id;
			return item; 
		});
		HealthApp.Router.Instance = new HealthApp.Router({
			"initialValues": initialValues
		});    
		Backbone.history.start();
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});	
});