var HotelSearch = require('./hotelsearch.js');

var Result = function(flightObject){
  this.flightInfo = flightObject;
  this.flightPrice = 0;
  this.hotels = []
  this.country = null;
  this.imageUrl = null;
}

Result.prototype = {
  initialise: function(){
    this.populateHotels();
  },

  populateHotels: function(){
    console.log(this.flightInfo.Quotes)
  },

  orderHotelsbyPrice: function(){
    this.hotels = _.sortBy(this.hotels, 'nightlyPrice')
  },

  orderHotelsbyStarRating: function(){
      this.hotels = _.sortBy(this.hotels, 'starRating').reverse();
  },

  orderHotelsbyPercentRating: function(){
      this.hotels = _.sortBy(this.hotels, 'percentRecommended').reverse();
  },

  orderHotelsbyGuestRating: function(){
      this.hotels = _.sortBy(this.hotels, 'guestRating').reverse();
  },

  createCheapestPackage: function(){
     if(this.hotels.length > 0){
       this.orderHotelsbyPrice();
       this.cheapestPackage = this.hotels[0].nightlyPrice + this.flightPrice;
     }
   }

}

module.exports = Result;