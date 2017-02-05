$(document).ready(function(){
    var count = 0;
    var order = 0;
    var update = [];
    console.log(localStorage.getItem('data'));
    var data = JSON.parse(localStorage.getItem('data'));
    fill(data);

    $("#result").on("click",".resultB", function(){
        var id = this.id;
        var num= parseInt(id);
        var tmp = data.favourites[num];
        $('#R'+num).removeClass("show");
        $('#R'+num).addClass("hide");
        var panel = '<li class="list-group-item" id="M'+order+'" ><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" class="unresultB" id='+order+'>Delete</button></li>';
        $('#u').append(panel);
        update.push(num);
        order++;
        count++;
    });

    $("#show").on("click",".unresultB", function(){
        console.log(this.id);
        var id = this.id;
        var num= parseInt(id);
        $('#M'+num).remove();
        $('#R'+num).removeClass("hide");
        $('#R'+num).addClass("show");
        removeArray(num,update);
    });

    function removeArray(count,array){
        var x = array.indexOf(count);
        if(x != -1){
            array.splice(x,1);
        }

    }
    function fill(data){
        $('#results').empty();
        var item = data.favourites;
        var panel2 = "";
        var exist = false;
        for(var i = 0; i < item.length;i++){
            tmp= item[i];
            panel2 += '<li class="list-group-item" id=R'+i+'><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" id='+i+'" class="resultB">Undo</button></li>';
        }
        $('#results').append(panel2);
    }

    $("#removeList").on("click",function(){
        console.log(localStorage.getItem('data'));
        var toSend = JSON.parse(localStorage.getItem('data'));
        console.log(toSend);
        for(var x = 0; x < update.length; x++){
            removeArray(update[x],toSend.favourites);
        }
        console.log(toSend);
        $.post("https://cloudcompyelp.herokuapp.com/api/update",toSend,function(data,status){
            if(status == "success"){
                console.log("success")
                console.log(data);
                if(data.error){
                    alert(data.message.data);
                }else{
                    $('#u').empty();
                    results = data.message;
                    localStorage.setItem('data', JSON.stringify(toSend));
                    console.log(results);
                }
            }
            console.log(status);
        },"json");
    });
});


