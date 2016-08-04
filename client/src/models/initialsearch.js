var InitialSearchParams = function(latLng, startDate, endDate){
  this.origin = latLng;
  this.startDate = startDate;
  this.endDate = endDate;
}

InitialSearchParams.prototype = {}

module.exports = InitialSearchParams;

