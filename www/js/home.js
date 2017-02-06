var map;
var marker = [];
var infowindow = [];
var uluru = {lat: -25.363, lng: 131.044};
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
    var favs = JSON.parse(localStorage.getItem('data')).favourites;
    createMarkers(favs);
}

//Creates all the Info panels and Markers for the map
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
        console.log(tmp);
        panel = '<div><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>Categories:';
        for(var i = 0; i < tmp.categories.length;i++){
            panel += ' ' + tmp.categories[i][0] +', ';
        }
        panel += '<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a></div>';
        infowindow.push(new google.maps.InfoWindow({
             content:panel
        }));
        marker[x].addListener('click',function(){
            var index = this.get('store_id');
            console.log(index);
            console.log(this);
            console.log(infowindow);
            infowindow[index].open(map,marker[index]);
        });
    }


}
$(document).ready(function(){
});

