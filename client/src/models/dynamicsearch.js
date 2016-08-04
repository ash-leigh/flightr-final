var DynamicSearch = function(){

}

DynamicSearch.prototype = {
  getUserInput: function(){
    var userInput = document.getElementById('userOriginSelect');
    userInput.onchange = this.save;
    userInput.onkeyup = this.search;
  },
  save: function(){
    localStorage.setItem('locationData', JSON.stringify({origin: this.value.split('/')[1]}));
    console.log(this.value.split('/')[1])

    var originalOrigin = document.getElementById('suggestedOrigin');

    if(this.value != 0){
      originalOrigin.innerHTML = this.value.split('/')[0];
    }

  },
  search: function(){
    var populateOptions = function(data){

      var datalist = document.getElementById('datalist');
      datalist.innerHTML = "";
      data.Places.forEach(function(place){

        var option = document.createElement('option')
        // option.className = 'dynamicSearchOptions';
        option.text = place.PlaceId;
        option.value = place.PlaceName + "/" + place.PlaceId;;
        datalist.appendChild(option);
      })
    }
    var getPlaceData = function(query){
      var url = 'http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/GB/GBP/en-GB?query=' + query + '&apiKey=co301553792687403420764331127549'
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.onload = function(){
        if(request.status === 200){
          var jsonString = request.responseText;
          var placeData = JSON.parse(jsonString);
          populateOptions(placeData);
        }
      }
      request.send(null);
    }
    var searchTerm = document.getElementById('userOriginSelect').value;
    if(searchTerm.length > 0){
      getPlaceData(searchTerm);
    }
  }
}

module.exports = DynamicSearch;




