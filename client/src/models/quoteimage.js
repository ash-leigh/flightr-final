var QuoteImage = function(){

}

QuoteImage.prototype = {
  getDestinationLatLng: function(result){
    return new Promise(function(resolve, reject) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': result.destinationCity}, function(results, status){
        if (status === google.maps.GeocoderStatus.OK){
          var destinationCityLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
          resolve(destinationCityLatLng)
          //look here
          // this.getImageFromFlickr(destinationCityLatLng)
          ////
        }else{
          resolve({lat: 55.946986700000004, lng: -3.2014716})
        }
      }.bind(this))
    }.bind(this))//end of promise
  },

  getImageFromFlickr: function(latLngObject){
    return new Promise(function(resolve, reject) {
      var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=29554eabfea5d95ac567a1ad364a398a&tags=landscape&lat='+ latLngObject.lat +'&lon='+ latLngObject.lng +'&in_gallery&format=json&nojsoncallback=1' 
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.onload = function () {var QuoteImage = function(){
        randomLatLngs = [
        {lat: -1.2920659, lng: 36.82194619999996},
        {lat: 1.352083, lng: 103.81983600000001},
        {lat: 25.0329694, lng: 121.56541770000001},
        {lat: 10.8230989, lng: 106.6296638},
        {lat: 24.7135517, lng: 46.67529569999999},
        {lat: -1.9705786, lng: 30.10442880000005},
        {lat: 41.0082376, lng: 28.97835889999999},
        {lat: 36.7537703, lng: 3.0587927000000263},
        {lat: -6.2087634, lng: 106.84559899999999},
        {lat: 30.0444196, lng: 31.23571160000006},
        {lat: 5.6037168, lng: -0.18696439999996528},
        {lat: 3.139003, lng: 101.68685499999992},
        {lat: 29.31166, lng: 47.48176599999999},
        {lat: 43.653226, lng: -79.38318429999998},
        {lat: -12.046374, lng: -77.0427934},
        {lat: 35.6891975, lng: 51.388973599999986},
        {lat: 34.9002535, lng: 33.623172299999965}
        ]
      }

      QuoteImage.prototype = {
        getDestinationLatLng: function(result){
          return new Promise(function(resolve, reject) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': result.destinationCity}, function(results, status){
              if (status === google.maps.GeocoderStatus.OK){
                var destinationCityLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}
                resolve(destinationCityLatLng)
              }else{
                resolve(this.randomLatLngs).randomElement();
              }
            }.bind(this))
    }.bind(this))//end of promise
        },
        getImageFromFlickr: function(latLngObject){
          return new Promise(function(resolve, reject) {
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d836aea8ef2a786aad020fb216b0b1c4&tags=landscape&lat='+ latLngObject.lat +'&lon='+ latLngObject.lng +'&format=json&nojsoncallback=1' 
            var request = new XMLHttpRequest();
            request.open("GET", url);
            request.onload = function () {
              if (request.status === 200) {
                var jsonString = request.responseText;
                var photosObject = JSON.parse(jsonString);
                photo = photosObject.photos.photo[0]
                resolve(this.constructImgLink(photo));
              }
            }.bind(this)
            request.send();
      }.bind(this))//end of promise
        }, 
        constructImgLink: function(photoObject){
          return 'https://farm' + photoObject.farm + '.staticflickr.com/' + photoObject.server + '/' + photoObject.id + '_' + photoObject.secret + '_b.jpg>'
        }
      }

      module.exports = QuoteImage;

      if (request.status === 200) {
        var jsonString = request.responseText;
        var photosObject = JSON.parse(jsonString);
        photo = photosObject.photos.photo[0]
        resolve(this.constructImgLink(photo));
      }
    }.bind(this)
    request.send();
      }.bind(this))//end of promise
  }, 
  constructImgLink: function(photoObject){
    return 'https://farm' + photoObject.farm + '.staticflickr.com/' + photoObject.server + '/' + photoObject.id + '_' + photoObject.secret + '_b.jpg>'
  }
}

module.exports = QuoteImage;






