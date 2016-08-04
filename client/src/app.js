var FlightSearch = require('./models/flightsearch.js');
var HotelSearch = require('./models/hotelsearch.js');
var ResultObject = require('./models/result.js');
var AllResultsObject = require('./models/allresults.js');
var InitialSearchView = require('./views/initialsearchview.js');
var InitialUserPositionView = require('./views/initialuserpositionview.js');
var InitialUserPosition = require('./models/initialuserposition.js');
var ResultBoxes = require('./views/allresultsview.js');

var keys = {
 skyscannerApiKey: 'co468894652126447657585032947837',
 expediaApiKey: 'wJmGLrOnZQIQ40OaicYdOt6aXhbMdGig'
}

window.onload = function(){
 window.scrollTo(0,0);
 setDates();
 //init models
 var allResults = new AllResultsObject();
 var flightSearch = new FlightSearch();
 var hotelSearch = new HotelSearch();
 var resultDisplay = new ResultBoxes();
 //ready event listeners
 var initialSearchView = new InitialSearchView();
 initialSearchView.handleSearchClick(flightSearch, hotelSearch, keys);
 //load current position
 var initialUserPosition = new InitialUserPosition();
 initialUserPosition.getUserLatLng();
 //for testing - show previous search object
 allResults.populateFromLocal();
 var testResults = JSON.parse(localStorage.getItem('lastSearch')) || [];
}


var setDates = function(){
 var today = new Date();
 var startDate = document.getElementById('searchStartDateInput')
 today.setDate(today.getDate() + 1); 
 startDate.value = formateDates(today)
 var endDate = document.getElementById('searchEndDateInput')
 today.setDate(today.getDate() + 2); 
 endDate.value = formateDates(today)
}

var formateDates = function(date){
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear()
  
  if(mm < 10){
    mm = '0'+mm;
  }
  if(dd < 10){
    dd = '0'+dd;  
  }
  return yyyy+'-'+mm+'-'+dd;
}

