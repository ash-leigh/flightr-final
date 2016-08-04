//nats comment//

var FlightQuote = function(quoteQbject){
  this.originCity = quoteQbject.OutboundLeg.OriginId,
  this.destinationCity = quoteQbject.OutboundLeg.DestinationId,
  this.outboundDate = this.fixdate(quoteQbject.OutboundLeg.DepartureDate),
  this.inboundDate = this.fixdate(quoteQbject.InboundLeg.DepartureDate),
  this.price = quoteQbject.MinPrice,
  this.outboundCarrier = quoteQbject.OutboundLeg.CarrierIds[0],
  this.inboundCarrier = quoteQbject.InboundLeg.CarrierIds[0]
  this.inboundAirport = quoteQbject.InboundAirportName
  this.outboundAirport = quoteQbject.OutboundAirportName
}

FlightQuote.prototype = {
  fixdate: function(date){
    dateArray = date.split('T')
    return dateArray[0]
  }
}

module.exports = FlightQuote;