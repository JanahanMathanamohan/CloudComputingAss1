/**
* Janahan Mathanamohan
* YelpSearch.js
* This JS file contains the methods for LookAtList.html
*/
$(document).ready(function(){
    var count = 0;
    var order = 0;
    var update = [];
    var results;

    // Functionaility for the submit button. Collects search info and sends it to the yelp search route
    $("#submit").click(function(){
        var toSend = {
            term: $("#term").val(),
            location: $("#location").val(),
            radius: $("#radius").val(),
            sort : 0,
            limit: $("#limit").val()
        };
        $.post("https://cloudcompyelp.herokuapp.com/api/yelpSearch",toSend,function(data,status){
            if(status == "success"){
                if(data.error){
                    alert(data.message.data)
                }else{
                    results = data.message.businesses;
                    alert("Done Search");
                    fill(results);
                }
            }
        },"json");
    });

    //Interest Button functionality. Moves the item from the results section into the New Favourite section
    $("#result").on("click",".interestB", function(){
        var id = this.id;
        var num= parseInt(id);
        var tmp = results[num];
        $('#R'+num).removeClass("show");
        $('#R'+num).addClass("hide");
        var panel = '<li class="list-group-item" id="M'+order+'" ><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" class="unInterestB" id='+order+'>Not Interest</button></li>';
        $('#NewFavs').append(panel);
        update.push(num);
        order++;
        count++;
    });

    //UnInterest Button functionality. Removes the item from the new favourites section
    $("#NewFav").on("click",".unInterestB", function(){
        var id = this.id;
        var num= parseInt(id);
        $('#M'+num).remove();
        $('#R'+num).removeClass("hide");
        $('#R'+num).addClass("show");
        var x = update.indexOf(num);
        if(x != -1){
            update.splice(x,1);
        }

    });

    //Update Button functionality. To compile the list of restaurants to the backend and send the request to the backend
    $("#update").on("click",function(){
        var holder = JSON.parse(localStorage.getItem('data'));
        var toSend = {};
        toSend.id = holder.id;
        toSend.favourites = [];
        console.log(reults);
        for(var x = 0; x < update.length; x++){
        }
        console.log(toSend.favourites);
        console.log(toSend);
        $.post("https://cloudcompyelp.herokuapp.com/api/update",toSend,function(data,status){
            if(status == "success"){
                if(data.error){
                    alert(data.message.data);
                }else{
                    $('#NewFavs').empty();
                    update = [];
                    console.log(data);
                    localStorage.setItem('data', JSON.stringify(toSend));
                }
            }
        },"json");
    });

    /**
    * Fills in the data obtained in yelp inside the div container result
    * @param {Yelp Object} data
    **/
    function fill(data){
        $('#results').empty();
        var item = data;
        var panel2 = "";
        var exist = false;
        for(var i = 0; i < item.length;i++){
            tmp= item[i];
            panel2 += '<li class="list-group-item" id=R'+i+'><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" id='+i+'" class="interestB">Interest</button></li>';
        }
        $('#results').append(panel2);
    }
});


