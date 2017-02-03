var map;
var marker;
var autocomplete;
var service;
var uluru;
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
        return navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position){
    return{lat: position.coords.latitude, lng: position.coords.longitude}
}

//Initializing Google Maps
function initMap() {
    getLocation();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: getLocation()
    });
    console.log(map);
    var input = document.getElementById('location');
    geocoder = new google.maps.Geocoder();
    infowindow = new google.maps.InfoWindow();
}

$(document).ready(function(){
    $("#submit").click(function(){
        $('body').addClass("loading");
        numpost = parseInt($('#numpost').val())
        var toSend = {
            keyword: $("#search").val(),
            location: $("#location").val(),
            distance: $("#distance").val(),
            pages:numpost*4
        };
        $("#loading").show();
        geocoder.geocode( { 'address': toSend.location}, function(results, status){
            if(status == 'OK'){
                map.setCenter(results[0].geometry.location);
                map.setZoom(12);
                toSend.location = getAddressInfo(results[0].address_components ,toSend.location );
                makeLocation(results[0].geometry.location,toSend);
            }else{
                alert("Error");
            }
        });
    });
    function makeLocation(location,toSend){
        companies = new Object();
        var promises = []
        item= [];
        validcount = 0;
        $.post("./PHPScript/getJobs.php",toSend,function(result,status){
            console.log(status);
            if(status == "success"){
                count = 0;
                bounds = new google.maps.LatLngBounds();
                console.log(result);
                for(var i = 0; i < result.length && validcount <= numpost; i++){
                    if(result[i].COMPANY != ""){
                        var request = {
                            location: location,
                            radius: parseInt(toSend.distance),
                            query: result[i].COMPANY
                        }
                        promises.push(aSync(count,result[i],request));
                        sleep(500);
                    }
                }
                Promise.all(promises).then(function() {
                    fill();
                    map.fitBounds(bounds);
                    $('body').removeClass("loading");
                }, function(err) {
                    $('body').removeClass("loading");
                    alert("error");
                });
            }else{
                alert("error");
            }
        },"json");
    }
    function aSync(i,search,request){
        return new Promise (function(resolve,reject){
            service.textSearch(request,function(results,status){
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    if(computeDistance(results[0].geometry.location,request.location,request.radius)){
                        return resolve(results);
                    }
                    var check = checkCompany({
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng()
                            });
                    if(check == -1){
                        count++;
                        var marker = new google.maps.Marker({
                            map: map,
                            label: count.toString(),
                            position: results[0].geometry.location
                        });
                        var arr = [{
                            info : search,
                            show : true
                        }];
                        item.push({
                            address: results[0].formatted_address,
                            marker:marker,
                            position : {
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng()
                            },
                            jobInfo: arr,
                            subPosts: 1,
                            dPosts: 0
                        });
                        bounds.extend(results[0].geometry.location);
                    }else{
                        item[check].subPosts++;
                        item[check].jobInfo.push({
                            info: search,
                            show: true
                        })
                    }
                    return resolve(results);
                }else{
                    console.log(search.COMPANY);
                    console.log(status);
                    return resolve(status);
                }
            });
        });
    }
    function checkCompany(position){
        for(var i = 0; i < item.length;i++){
            if(item[i].position.lat == position.lat && item[i].position.lng == position.lng){
                return i;
            }
        }
        return -1;
    }
    function getAddressInfo(address,prevAddress){
        var tmp = "";
        var addr = "";
        for(var x = 0;x < address.length;x++){
            for(var i = 0;i < address[x].types.length; i++){
                tmp = address[x].types[i];
                if(tmp == "locality" || tmp == "administrative_area_level_1"|| tmp=="country"){
                    addr += address[x].long_name + " ";
                }
            }
        }
        console.log(addr);
        return addr;
    }

    function computeDistance(pos1, pos2,d){
        var x = google.maps.geometry.spherical.computeDistanceBetween(pos1,pos2);
        x = x/1000;
        if(x <= d && validcount < numpost){
             validcount++;
             return false;
        }
        return true;
    }
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }
    function fill(){
        $('#resultShow').empty();
        $('#resultHide').empty();
        for(var i = 0; i < item.length;i++){
            var panel = '<div id=l'+i+' class="panel panel-primary ps"><div class="markerpoint panel-heading psh"><h3 class="panel-title psh"><b>'+(i+1)+ ':</b> &nbsp ' + item[i].address +'</h3></div>';
            var panel2 = '<div id=lD'+i+' class="panel panel-danger ps" ><div class="markerpoint panel-heading psh"><h3 class="panel-title psh"><b>'+(i+1)+ ':</b> &nbsp ' + item[i].address +'</h3></div>';

            for(var x = 0; x < item[i].jobInfo.length;x++){
                var tmp = item[i].jobInfo[x].info;
                panel += '<div  class="panel-body bottomLine" id="l'+i+'S'+x+'I"><div class="col-md-8">'+tmp.COMPANY+'<br>'+tmp.TITLE+'<br>'+tmp.DATE+'<br>'+tmp.DESC+'<br><a href="'+tmp.URL+'">Link</a><br>'+tmp.SALARY+'</div>';
                panel += '<div class="col-md-4 text-center maxH"><button type="button" id="l'+i+'S'+x+'" class="discardB btn btn-primary ">Discard</button></div></div>';
                panel2 += '<div class="panel-body bottomLineR" id="l'+i+'S'+x+'D"><div  class="col-md-8">'+tmp.COMPANY+'<br>'+tmp.TITLE+'<br>'+tmp.DATE+'<br>'+tmp.DESC+'<br><a href="'+tmp.URL+'">Link</a><br>'+tmp.SALARY+'</div><div class="col-md-4 text-center maxH"><button type="button" id="l'+i+'S'+x+'"class="btn btn-danger interestB">Interest</button></div></div>';
            }
            panel += '</div>';
            panel2 += '</div>';
            $('#resultShow').append(panel);
            $('#resultHide').append(panel2);
            for(var x = 0; x < item[i].jobInfo.length;x++){
                $('#l'+i+'S'+x+'D').hide();
            }
            $('#lD'+i).hide();
        }
        $('#resultHide').hide();
    }
    $("#resultShow").on("click",".discardB", function(){
        console.log(this.id);
        var id = this.id;
        var itemNum = id.substring(id.indexOf('l')+1,id.indexOf('S'));
        console.log(itemNum);
        itemNum = parseInt(itemNum);
        console.log(itemNum);
        item[itemNum].subPosts--;
        item[itemNum].dPosts++;
        if(item[itemNum].subPosts <= 0){
            $('#l'+itemNum).hide();
            item[itemNum].marker.setVisible(false);
        }
        if(item[itemNum].dPosts > 0){
            $('#lD'+itemNum).show();
        }
        $('#'+this.id+"I").hide();
        $('#'+this.id+"D").show();
    });
    $("#resultHide").on("click",".interestB", function(){
        console.log(this.id);
        var id = this.id;
        var itemNum = id.substring(id.indexOf('l')+1,id.indexOf('S'));
        itemNum = parseInt(itemNum);
        item[itemNum].subPosts++;
        item[itemNum].dPosts--;
        if(item[itemNum].dPosts <= 0){
            $('#lD'+itemNum).hide();
        }
        if(item[itemNum].subPosts > 0){
            $('#l'+itemNum).show();
            item[itemNum].marker.setVisible(true);

        }
        $('#'+this.id+"D").hide();
        $('#'+this.id+"I").show();
    });

    $('#discarded').click(function(){
        $('#resultShow').hide();
        $('#resultHide').show();
        $('#viewing').removeClass('active');
        $('#discarded').addClass('active');
        for(var i = 0; i < item.length; i++){
            if(item[i].dPosts >= 1){
                item[i].marker.setVisible(true);
            }else{
                item[i].marker.setVisible(false);
            }
        }

    });
    $('#viewing').click(function(){
        $('#resultHide').hide();
        $('#resultShow').show();
        $('#discarded').removeClass('active');
        $('#viewing').addClass('active');
        for(var i = 0; i < item.length; i++){
            if(item[i].subPosts >= 1){
                item[i].marker.setVisible(true);
            }else{
                item[i].marker.setVisible(false);
            }
        }
    });


});

