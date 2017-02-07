/**
* Janahan Mathanamohan
* home.js
* This JS file contains the methods for home.html
*/

var map;
var marker = [];
var infowindow = [];
var uluru = {lat: -25.363, lng: 131.044};

/**
* Gets your current location
**/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

/**
* Puts your postion on the map
**/
function showPosition(position){
    uluru = {lat: position.coords.latitude, lng: position.coords.longitude}
    map.setCenter(uluru);
    var marker = new google.maps.Marker({
        map: map,
        position: uluru,
    });
}

/**
* Initalizes the Google Map
**/
function initMap() {
    getLocation();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });
    var input = document.getElementById('location');
    var favs = JSON.parse(localStorage.getItem('data')).favourites;
    createMarkers(favs);
}

/**
* Creates all the markers and info windows for your list of restuarants.
* @param {list of favourite restuarants} favs
**/
function createMarkers(favs){
    var location, panel, tmp;
    for(var x = 0; x < favs.length; x++){
        tmp = favs[x];
        location = favs[x].location;
        marker.push(  new google.maps.Marker({
            map: map,
            position: {lat: location.coordinate.latitude, lng: location.coordinate.longitude },
            icon: '../assets/restaurant.png',
            store_id: x,
        }));
        panel = '<div><img src='+tmp.image_url+' /><br><h4>'+tmp.name+'</h4><br>Rating: '+tmp.rating+'<br>Categories:';
        for(var i = 0; i < tmp.categories.length;i++){
            panel += ' ' + tmp.categories[i][0] +', ';
        }
        panel += '<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a></div>';
        infowindow.push(new google.maps.InfoWindow({
             content:panel
        }));
        marker[x].addListener('click',function(){
            var index = this.get('store_id');
            infowindow[index].open(map,marker[index]);
        });
    }
}

$(document).ready(function(){
});

