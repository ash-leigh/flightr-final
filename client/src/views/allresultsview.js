var ResultBoxes = function(){}


ResultBoxes.prototype = {
  populateAllResults: function(result){
    var button = document.getElementById('initialSearchButton');
    var masterParent = document.getElementById('masterparent');
    masterparent.className = "masterparent"
    this.stopLoadingAnimation(button);

    var subMasterParent = this.createRow();
    subMasterParent.className = 'submasterparent';

    var hotelsRow = this.createRow();
    hotelsRow.className = 'hotelsrow';

    this.createHeader(result, subMasterParent);
    this.createFlightRow(result, subMasterParent);
    this.createSortHotelsRow(result, subMasterParent, hotelsRow);
    this.populateInitHotels(result, subMasterParent, hotelsRow);

    masterParent.appendChild(subMasterParent)
},

stopLoadingAnimation: function(button){
    if(document.getElementById('spinner')){
        var loader = document.getElementById('spinner')
        loader.id = 'spinnerHide';
    };
    button.value = 'SEARCH DEALS';
    var spinloader = document.getElementById('spinloader')
    spinloader.className = '';
},

createSortHotelsRow: function(result, subMasterParent, hotelsRow) {
    var row = this.createRow();
    row.className = 'filterRow'

    var col1 = this.createCol('2');
    var priceLbl = document.createElement('label');
    priceLbl.innerText = "Hotel Price";
    priceLbl.className = "hotelprice";
    col1.appendChild(priceLbl);

    var col2 = this.createCol('2');
    var startRatingLbl = document.createElement('label');
    startRatingLbl.innerText = "Star Rating";
    startRatingLbl.className = "starrating";
    col2.appendChild(startRatingLbl);

    var col3 = this.createCol('3');
    var guestRecLbl = document.createElement('label');
    guestRecLbl.innerText = "Recommended %";
    guestRecLbl.className = "recommended";
    col3.appendChild(guestRecLbl);

    var col4 = this.createCol('2');
    var guesRatingLbl = document.createElement('label');
    guesRatingLbl.innerText = "Guest Rating";
    guesRatingLbl.className = "guestrating";
    col4.appendChild(guesRatingLbl);
    
    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    
    this.addMinusColumn(row);
    this.addGuestColumn(row);
    this.addPlusColumn(row);

    subMasterParent.appendChild(row);

    this.addSortingEventListeners(priceLbl, startRatingLbl, guestRecLbl, guesRatingLbl, hotelsRow, result, subMasterParent);

},

addMinusColumn: function(row){
    var colminus = document.createElement('div');
    colminus.className = "col-1";
    colminus.id = 'removeGuest';
    var minus = document.createElement('div')
    minus.onclick = this.removeGuest;
    minus.innerText = "--";
    minus.className = "minus";
    colminus.appendChild(minus)
    row.appendChild(colminus);
},

addGuestColumn: function(row){
    var colguest = document.createElement('div');
    colguest.className = "col-1";
    var countRow = document.createElement('div');
    countRow.className = 'row';
    var count = document.createElement('div')
    count.className = 'guestIncrement';
    count.innerText = "1"
    countRow.appendChild(count);
    colguest.appendChild(countRow);
    row.appendChild(colguest);
},

addPlusColumn: function(row){
    var colplus = document.createElement('div');
    colplus.className = "col-1";
    colplus.id = 'addGuest';
    var plus = document.createElement('div')
    plus.innerText = "++"
    plus.className = "plus";
    plus.onclick = this.addGuest;
    colplus.appendChild(plus)
    row.appendChild(colplus);
},

addSortingEventListeners: function(priceLbl, startRatingLbl, guestRecLbl, guesRatingLbl, hotelsRow, result, subMasterParent){
    priceLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by price')
        priceLbl.className = 'filterClick';
        startRatingLbl.className = 'starrating';
        guestRecLbl.className = 'recommended';
        guesRatingLbl.className = 'guestrating';
        console.log(result)
        result.orderHotelsbyPrice();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)

    //order hotels by star rating
    startRatingLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by * rating')
        priceLbl.className = 'hotelprice';
        startRatingLbl.className = 'filterClick';
        guestRecLbl.className = 'recommended';
        guesRatingLbl.className = 'guestrating';
        result.orderHotelsbyStarRating();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)

    //order by % rec
    guestRecLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by % rec')
        priceLbl.className = 'hotelprice';
        startRatingLbl.className = 'starrating';
        guestRecLbl.className = 'filterClick';
        guesRatingLbl.className = 'guestrating';
        result.orderHotelsbyPercentRating();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)

    //order guest rating
    guesRatingLbl.onclick = function(){
        hotelsRow.innerHTML = ""
        console.log('order hotels by guest rating')
        priceLbl.className = 'hotelprice';
        startRatingLbl.className = 'starrating';
        guestRecLbl.className = 'recommended';
        guesRatingLbl.className = 'filterClick';
        result.orderHotelsbyGuestRating();
        this.populateInitHotels(result, subMasterParent, hotelsRow)
    }.bind(this)
},

removeGuest: function(){

    var decreaseIncrement = function(){
        var packageTotals = document.getElementsByClassName('from');
        var increments = document.getElementsByClassName('guestIncrement');
        for (var i = 0; i < increments.length; i++) {
            increment = Number(increments[i].innerHTML);
            if(increment > 1){
                increments[i].innerHTML = (increment - 1)
            }
        }
    }
    decreaseIncrement();

    var decreasePrice = function(){
        var increments = document.getElementsByClassName('guestIncrement');
        var increment = Number(increments[0].innerHTML);

        var packageTotals = document.getElementsByClassName('from');
        for (var i = 0; i < packageTotals.length; i++) {
            var packagePrice = packageTotals[i].innerHTML;
            packagePrice = Number(packagePrice.split('£')[1]);
            packageTotals[i].innerHTML = '£' + (packagePrice / (increment + 1)) * increment;
        }
    }
    if(increment > 1){
        decreasePrice();
    }
},

addGuest: function(){

    var increaseIncrement = function(){
        var packageTotals = document.getElementsByClassName('from');
        var increments = document.getElementsByClassName('guestIncrement');
        for (var i = 0; i < increments.length; i++) {
            increment = Number(increments[i].innerHTML);
            if(increment >= 1){
                increments[i].innerHTML = (increment + 1)
            }
        }
    }
    increaseIncrement();

    var increasePrice = function(){
        var increments = document.getElementsByClassName('guestIncrement');
        var increment = Number(increments[0].innerHTML);

        var packageTotals = document.getElementsByClassName('from');
        for (var i = 0; i < packageTotals.length; i++) {
            var packagePrice = packageTotals[i].innerHTML;
            packagePrice = Number(packagePrice.split('£')[1]);
            packageTotals[i].innerHTML = '£' + (packagePrice * increment)/(increment - 1);
        }
    }

    increasePrice();
}, 

populateInitHotels: function(result, subMasterParent, hotelsRow){
    hotelsRow.id = "hotelrow"
    var count = 3;
    var torf = true;

    result.hotels.forEach(function(hotel){
        if(count < 1){
            torf = false;
        }
        var row = this.createSingleHotelLine(hotel, hotelsRow)
        if(torf === false){
            row.hidden = true;
        }
        count--;
        hotelsRow.appendChild(row)
    }.bind(this))

    var btn = document.createElement('input');
    btn.type = 'button';
    btn.value = 'More hotels';
    btn.className = 'moreButton';

    btn.onclick = function(event){
        var kids = hotelsRow.children;
        if(kids[kids.length-2].hidden === true){
            this.showAllHotels(hotelsRow, btn);
            return;
        }

        if(kids[kids.length-2].hidden === false){
            this.showLessHotels(hotelsRow, btn);
        }
    }.bind(this)
    var btnRow = this.createRow();
    btnRow.appendChild(btn)
    hotelsRow.appendChild(btnRow)

    subMasterParent.appendChild(hotelsRow);
},

showLessHotels: function(hotelsRow, btn){
    console.log('show less hotels')
    var kids = hotelsRow.children;
    var count = 3;
    for (var i = 0; i < kids.length -1; i++){
        if(count > 0){
            kids[i].hidden = false;
        }else{
            kids[i].hidden = true;
        }
        count--;
    }
    btn.value = "Show more hotels";
},

showAllHotels: function(hotelsRow, btn){
    console.log('show all hotels')
    var kids = hotelsRow.children;
    for (var i = 0; i < kids.length -1; i++){
        kids[i].hidden = false;
    }
    btn.value = "Show less hotels"
},

createSingleHotelLine: function(hotel, hotelsRow){
    var outerHotelRow = this.createRow();
    outerHotelRow.id = 'outerHotelRow'
    
    var row = document.createElement('div');
    row.className = "row hotel";
    //hotel name & location description//
    var div = document.createElement('div');
    div.className = 'col-10';
    //prevents lines being too long
    var p = document.createElement('p');
    if(hotel.hotelName.length + hotel.locationDescription < 70 && hotel.locationDescription){
        p.innerText = hotel.hotelName + ', ' + hotel.locationDescription;
    }else{
        p.innerText = hotel.hotelName 
    }
     //end prevent

     div.appendChild(p);
     row.appendChild(div);

    //cheapest package price//
    var div = document.createElement('div');
    div.className = 'col-2';
    var p = document.createElement('p');
    p.innerText = "£" + Math.floor(((this.calculateDaystravelled() * hotel.nightlyPrice)/1.33) + hotel.flightQuote.price);
    p.className = 'from';

    div.appendChild(p);
    row.appendChild(div);

    //hidden hotel row//
    //thumbnail hotel image//
    var row2 = document.createElement('div');
    row2.className = "row hiddenrow";
    var div = document.createElement('div');
    div.className = 'col-3';
    var image = document.createElement('img');
    image.src = 'http://images.travelnow.com' + hotel.thumbnailUrl;
    image.className = 'hotelThumbnail';
    div.appendChild(image);
    row2.appendChild(div);

    //hotel name, location, star rating and description//
    var div = document.createElement('div');
    div.className = 'col-6';
    var h3 = document.createElement('h3');
    if(hotel.locationDescription){
        h3.innerText = hotel.hotelName + ', ' + hotel.locationDescription;
    }else{
        h3.innerText = hotel.hotelName
    }
    h3.classname = 'hotelName';
    var h4 = document.createElement('h4');
    img = document.createElement('img')
    var stars = '/images/' + Math.floor(hotel.starRating)  + '-stars.png';
    img.src = stars;
    img.className = "starRatings"
    // h4.innerText = 'Our star rating: ' + Math.floor(hotel.starRating)  + '/5';
    h4.classname = 'starRating';
    var p = document.createElement('p');
    p.innerText = hotel.description; 
    p.classname = 'hotelDescription';
    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(p);
    row2.appendChild(div);

    //book, guest rating and percentage recommended//
    var div = document.createElement('div');
    div.className = 'col-3 ratings';
    var h3 = document.createElement('h3');
    h3.innerText = 'book';
    var h1 = document.createElement('h1');
    h1.innerHTML = 'Guest rating:  ' + '<b>' + hotel.guestRating + '/5' + '</b>';
    var h2 = document.createElement('h2');
    h2.innerHTML = 'Recommended:  ' + '<b>' + hotel.percentRecommended + '%' + '</b>';
    div.appendChild(h3);
    div.appendChild(h1);
    div.appendChild(h2);
    row2.appendChild(div);
    row2.hidden = true

    outerHotelRow.appendChild(row);
    outerHotelRow.appendChild(row2);

    //onclick for hidden rows//
    outerHotelRow.onclick = function(){
    //add transition classes here
    console.log('OuterHotel Clicked...')
    if(row2.hidden === false){
        row2.hidden = true
    }else{
       row2.hidden = false 
   };
}
return outerHotelRow;
},

createFlightRow: function(result, subMasterParent){
    var flightRow = this.createRow();

    var row = document.createElement('div')
    row.className = "row flight";
        //outbound leg//
        //outbound carrier logo//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/plane.png'; //this is for carrier logo from API//
        image.className = 'planeIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //origin city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.originCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        //arrow icon//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/arrow.png'; //this is for carrier logo from API//
        image.className = 'arrowIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //destination city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.destinationCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        //inbound leg//
        //inbound carrier logo//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/plane.png'; //this is for carrier logo from API//
        image.className = 'planeIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //destination (origin) city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.destinationCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        //arrow icon//
        var div = document.createElement('div');
        div.className = 'col-1';
        var image = document.createElement('img');
        image.src = 'images/arrow.png'; //this is for carrier logo from API//
        image.className = 'arrowIcon';
        div.appendChild(image);
        row.appendChild(div);
        flightRow.appendChild(row);

        //origin (destination) city//
        var div = document.createElement('div');
        div.className = 'col-2';
        var p = document.createElement('p');
        p.innerText = result.flightInfo.originCity;
        div.appendChild(p);
        row.appendChild(div);
        flightRow.appendChild(row);

        subMasterParent.appendChild(flightRow);
    },

    createHeader: function(result, subMasterParent){

       var row = document.createElement('div');
       row.className = "row destination";
       row.style.backgroundImage = "url('" + result.imageUrl + "')"
       var div = document.createElement('div');
       div.className = 'col-12';

       var headerText = document.createElement('div')
       headerText.className = 'destinationTitle'
       headerText.innerHTML = result.flightInfo.destinationCity;

       // var h1 = document.createElement('h1');
       // h1.innerText = result.flightInfo.destinationCity;
       // div.appendChild(h1);
       div.appendChild(headerText)
       row.appendChild(div);

       subMasterParent.appendChild(row)
   },

   createRow: function(){
    var row = document.createElement('div');
    row.className = "row";
    return row;
},

createCol: function(num){
    var col = document.createElement('div');
    col.className = "col-" + num;
    return col;
},

calculateDaystravelled: function(){
    var depDate = document.getElementById('searchStartDateInput')
    var retDate = document.getElementById('searchEndDateInput')
    var oneDay = 24*60*60*1000;
    var firstDate = new Date(depDate.value);
    var secondDate = new Date(retDate.value);
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)))
    return diffDays;
}

}

module.exports = ResultBoxes;