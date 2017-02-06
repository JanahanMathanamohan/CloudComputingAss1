var map;
var marker = [];
var uluru = {lat: -25.363, lng: 131.044};
var geocoder;
var infowindow = [];
var oms;
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
    var favs = JSON.parse(localStorage.getItem('data')).favourites;
    var location;
    var tmp;
    var panel;
    for(var x = 0; x < favs.length; x++){
        tmp = favs[x];
        location = favs[x].location;
        marker.push(  new google.maps.Marker({
            map: map,
            position: {lat: location.coordinate.latitude, lng: location.coordinate.longitude },
            icon: '../assets/restaurant.png'
        }));
        panel = '<div class="container" ><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a></div>';
        infowindow.push(new google.maps.InfoWindow({
             content:panel
        }));
        marker[x].addListener('click',function(){
            infowindow[x].open(map,marker[x]);
        });
    }

}

$(document).ready(function(){
});

