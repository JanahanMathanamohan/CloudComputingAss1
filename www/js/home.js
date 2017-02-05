var map;
var marker;
var autocomplete;
var service;
var uluru = {lat: -25.363, lng: 131.044};
var geocoder;
var item;
var infowindow;
var companies;
var oms;
var bounds;
var validcount = 0;
// Set the position for Google maps
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position){
    uluru = {lat: position.coords.latitude, lng: position.coords.longitude}
    map.setCenter(uluru);
    var marker = new google.maps.Marker({
        map: map,
        position: uluru,
    });

}

//Initializing Google Maps
function initMap() {
    getLocation();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });
    var input = document.getElementById('location');
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
    var favs = JSON.parse(localStorage.getItem('data')).favourites;
    var location;
    for(var x = 0; x < favs.length; x++){
        location = favs[x].location;
        var marker = new google.maps.Marker({
            map: map,
            position: {lat: location.coordinate.latitude, lng: location.coordinate.longtitude },
            icon: '../assets/restaurant.png'
        })
    }

}

$(document).ready(function(){
});

