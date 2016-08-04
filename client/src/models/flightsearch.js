var HotelSearch = require('./hotelsearch.js');
var FlightQuote = require('./flightquote.js');

var FlightSearch = function(data){
  this.quotes = [];
}

FlightSearch.prototype = {
  getFlightData: function(keys, locationData){
    console.log('LOCATION DATA:', locationData)
    return new Promise(function(resolve, reject) {
      var url = this.createSkyscannerUrl(locationData) 
      url = url + keys.skyscannerApiKey;
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function(){
        if(request.status === 200){
          var jsonString = request.responseText;
          var flightData = JSON.parse(jsonString);
          var newFlightData = this.replaceCodes(flightData);
          //clearing quotes stops previous searches reloading.
          this.quotes = [];
          this.populateQuotes(newFlightData);
          resolve(this)
        }//end of onload if
      }.bind(this)
      request.send(null);
    }.bind(this))//end of promise
  },

  createSkyscannerUrl: function(locationData){
    var url = 'http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/GB/GBP/en-GB/' + locationData.origin + '/everywhere/' + locationData.startDate + '/' + locationData.endDate + '?apiKey='
    return url;
  },

  replaceOriginCityCode: function(flightData){
    var quotes = flightData.Quotes;
    var cities = flightData.Places;
    quotes.forEach(function(quote){
      cities.forEach(function(city){
        if(quote.OutboundLeg.OriginId === city.PlaceId){
          quote.OutboundLeg.OriginId = city.CityName;
          quote.InboundLeg.DestinationId = city.CityName;
          quote.OutboundAirportName = city.Name;
        }
      })
    })
    return flightData;
  },

  replaceDestinationCityCode: function(flightData){
    var quotes = flightData.Quotes;
    var cities = flightData.Places;
    quotes.forEach(function(quote){
      cities.forEach(function(city){
        if(quote.OutboundLeg.DestinationId === city.PlaceId){
          quote.OutboundLeg.DestinationId = city.CityName;
          quote.InboundLeg.OriginId = city.CityName;
          quote.InboundAirportName = city.Name;
        }
      })
    })
    return flightData;
  },

  replaceOutboundCarrierCode: function(flightData){
    var quotes = flightData.Quotes;
    var carriers = flightData.Carriers;
    quotes.forEach(function(quote){
      carriers.forEach(function(carrier){
        if(quote.OutboundLeg.CarrierIds[0] === carrier.CarrierId){
          quote.OutboundLeg.CarrierIds[0] = carrier.Name;
        }
      })
    })
    return flightData;
  },

  replaceInboundCarrierCode: function(flightData){
    var quotes = flightData.Quotes;
    var carriers = flightData.Carriers;
    quotes.forEach(function(quote){
      carriers.forEach(function(carrier){
        if(quote.InboundLeg.CarrierIds[0] === carrier.CarrierId){
          quote.InboundLeg.CarrierIds[0] = carrier.Name;
        }
      })
    })
    return flightData;
  },

  replaceCodes: function(flightData){
    var flightData = this.replaceOriginCityCode(flightData);
    flightData = this.replaceDestinationCityCode(flightData);
    flightData = this.replaceOutboundCarrierCode(flightData);
    flightData = this.replaceInboundCarrierCode(flightData);
    return flightData;
  },

  populateQuotes: function(flightData){
    flightData.Quotes.forEach(function(flight){
      this.quotes.push(new FlightQuote(flight))
    }.bind(this))
  }
}

module.exports = FlightSearch;