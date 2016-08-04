var DynamicSearch = require('./dynamicsearch.js');
var DynamicSearchView = require('../views/dynamicsearchview.js')

var InitialUserPosition = function(){}

InitialUserPosition.prototype = {
  getUserLatLng: function(){
      navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.getUserLocationName(Number(lat), Number(lng))
      }.bind(this))
  },
  
  getUserLocationName: function(lat, lng){
    var geocoder = new google.maps.Geocoder();
    var latLng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latLng}, function(results, status){
      var addressComponents = results[0].address_components
      addressComponents.forEach(function(component){
        component.types.forEach(function(type){
          if(type === 'locality'){
            console.log(component.long_name)
            // return component.long_name;
            var InitialUserPositionView = require('../views/initialuserpositionview.js'); 
            var positionView = new InitialUserPositionView();
            positionView.displayLocation(component.long_name);
            var locationData = {origin: lat + "," + lng + "-latlong" }
            localStorage.setItem('locationData', JSON.stringify(locationData));
            var dynamicSearch = new DynamicSearch();
            dynamicSearch.getUserInput();
            var dynamicSearchView = new DynamicSearchView();
            dynamicSearchView.showDynamicSearch();
          }
        })
      })
    })
  }
}

module.exports = InitialUserPosition;