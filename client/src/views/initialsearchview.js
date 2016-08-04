var InitialSearchParams = require('../models/initialsearch.js');
var ResultObject = require('../models/result.js');
var AllResultsObject = require('../models/allresults.js');

var InitialSearchView = function(){}

InitialSearchView.prototype = {
  handleSearchClick: function(flightSearch, hotelSearch, keys){
    var button = document.getElementById('initialSearchButton');

    button.onclick = function(){
      var masterParent = document.getElementById('masterparent');
      masterparent.style.minHeight = "60em";
      console.log('clicked')
      var target = document.getElementById("spinloader");
      this.animate(document.body, "scrollTop", "", 0, target.offsetTop, 2000, true);

      this.initLoadingAnimation(button);
      this.resetMasterParent();
  
      flightSearch.getFlightData(keys, this.getPositionData()).then(function(response) {
        return response.quotes
      }).then(function(response){
        //loop through each quote and call a function to create a results object
        //only return once all hotel data has came back
        return Promise.all(response.map(function (quote) {
          return hotelSearch.getHotelData(keys, quote)
        }))
      }).then(function (arrayOfResults) {
        var allResults = new AllResultsObject();
        allResults.results = arrayOfResults
        console.log('Finished loading results:',allResults)
        localStorage.setItem('lastSearch', JSON.stringify(allResults));
      });
    }.bind(this);
  },

  animate: function(elem,style,unit,from,to,time,prop) {
      if( !elem) return;
      var start = new Date().getTime(),
          timer = setInterval(function() {
              var step = Math.min(1,(new Date().getTime()-start)/time);
              if (prop) {
                  elem[style] = (from+step*(to-from))+unit;
              } else {
                  elem.style[style] = (from+step*(to-from))+unit;
              }
              if( step == 1) clearInterval(timer);
          },25);
      elem.style[style] = from+unit;
  },

  resetMasterParent: function(){
    var reset = document.getElementById('masterparent');
    reset.innerHTML = "";
  },

  initLoadingAnimation: function(button){
    var loader = document.getElementById('spinnerHide');
    var spinloader = document.getElementById('spinloader')
    spinloader.className = 'loading'
    loader.id = 'spinner';
    button.value = '';

  },

  getPositionData :function(){
      var startDate = document.getElementById('searchStartDateInput').value
      var endDate = document.getElementById('searchEndDateInput').value
      var origin = JSON.parse(localStorage.getItem('locationData'));
      var locationData = {origin: origin.origin, startDate: startDate, endDate: endDate}
      return locationData;
  },

  saveResultsLocal: function(allResults){
    localStorage.setItem('lastSearch', JSON.stringify(allResults));
    var retrievedObject = JSON.parse(localStorage.getItem('allSearches')) || [];
    retrievedObject.push(allResults);
    localStorage.setItem('allSearches', JSON.stringify(retrievedObject));
  },

  constructString: function(lat, lng){
    var string = lat + ',' + lng + '-latlong';
    return string;
  },

  getUserLatLng: function(){
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var latLng = this.constructString(lat, lng)
        resolve(latLng)
      }.bind(this))
    }.bind(this))
  },

  getStartDate: function(){
    var startDate = document.getElementById('searchStartDateInput').value;
    return startDate
  },

  getEndDate: function(){
    var endDate = document.getElementById('searchEndDateInput').value;
    return endDate
  }, 
  
  newSearchParams: function(latLng){
    var initialSearchParams = new InitialSearchParams(latLng, this.getStartDate(), this.getEndDate());
    return initialSearchParams;
  }
}

module.exports = InitialSearchView;


