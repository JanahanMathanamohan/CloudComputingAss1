/**
* Janahan Mathanamohan
* LookAtList.js
* This JS file contains the methods for LookAtList.html
*/
$(document).ready(function(){
    var count = 0;
    var order = 0;
    var update = [];
    var data = JSON.parse(localStorage.getItem('data'));
    fill(data);

    //The delete button functionality. Removes an item from your list.
    $("#Interest").on("click",".delete", function(){
        var id = this.id;
        var num= parseInt(id);
        var tmp = data.favourites[num];
        $('#R'+num).removeClass("show");
        $('#R'+num).addClass("hide");
        var panel = '<li class="list-group-item" id="M'+order+'" ><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" class="undo" id='+order+'>Undo</button></li>';
        $('#removeList').append(panel);
        update.push(num);
        order++;
        count++;
    });

    //The undo button functionality. Re adds the item you wanted to remove from your list
    $("#unInterest").on("click",".undo", function(){
        var id = this.id;
        var num= parseInt(id);
        $('#M'+num).remove();
        $('#R'+num).removeClass("hide");
        $('#R'+num).addClass("show");
        var x = array.indexOf(num);
        if(x != -1){
            update.splice(x,1);
        }

    });

    //Update Button functionality. To compile the list of restaurants to the backend and send the request to the backend
    $("#update").on("click",function(){
        var toSend = JSON.parse(localStorage.getItem('data'));
        var check = true;
        var favs = toSend.favourites;
        var newFav = [];
        for(var x = 0; x < favs.length; x++){
            check = true;
            for(var i = 0; i < update.length; i++){
                if(x == update[i]){
                    check = false;
                }
            }
            if(check){
                newFav.push(favs[x]);
            }
        }
        toSend.favourites = newFav;
        var toSend = JSON.stringify(toSend);
        $.ajax({
            url:"https://cloudcompyelp.herokuapp.com/api/update",
            type:"POST",
            data:toSend,
            contentType:'application/json',
            dataType: "JSON",
            success: function(data,status){
                if(status == "success"){
                    if(data.error){
                        alert(data.message.data);
                    }else{
                        $('#removeList').empty();
                        update = [];
                        results = data.message;
                        localStorage.setItem('data', toSend);
                    }
                }
            }
        })
    });

    /**
    * Fills in the data obtained in yelp inside the div container list
    * @param {Yelp Object} data
    **/
    function fill(data){
        $('#list').empty();
        var item = data.favourites;
        var panel2 = "";
        var exist = false;
        for(var i = 0; i < item.length;i++){
            tmp= item[i];
            panel2 += '<li class="list-group-item" id=R'+i+'><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" id='+i+'" class="delete">Delete</button></li>';
        }
        $('#list').append(panel2);
    }

});


