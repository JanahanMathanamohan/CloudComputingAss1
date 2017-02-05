$(document).ready(function(){
    var count = 0;
    var order = 0;
    var update = [];
    var results;
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
                console.log("success")
                console.log(data);
                if(data.error){
                    alert(data.message.data)
                }else{
                    results = data.message.businesses;
                    console.log(results);
                    fill(results);
                }
            }
        },"json");
    });

    $("#result").on("click",".resultB", function(){
        var id = this.id;
        var num= parseInt(id);
        var tmp = results[num];
        $('#R'+num).addClass("hide");
        var panel = '<li class="list-group-item" id="M'+order+'" ><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" class="unresultB" id='+order+'>Not Interest</button></li>';
        $('#u').append(panel);
        update.push(tmp);
        order++;
        count++;
    });

    $("#update").on("click",".unresultB", function(){
        console.log(this.id);
        var id = this.id;
        var num= parseInt(id);
        $('#M'+num).remove();
        $('#R'+num).removeClass("hide");
        $('#R'+num).addClass("show");
        var x = update.indexOf(count);
        if(x != -1){
            update.splice(x,1);
        }

    });
    function fill(data){
        $('#results').empty();
        var item = data;
        var panel2 = "";
        console.log(item);
        for(var i = 0; i < item.length;i++){
            var tmp = item[i];
            panel2 += '<li class="list-group-item" id=R'+i+'><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" id='+i+'" class="resultB">Interest</button></li>';

        }
        console.log(panel2);
        $('#results').append(panel2);
    }
    $("#addFav").on("click",function(){
        var toSend =[];
        for(var x = 0; x < update.length; x++){
            toSend.push(results[update[x]]);
        }
        console.log(toSend);
        $.post("https://cloudcompyelp.herokuapp.com/api/updateList",toSend,function(data,status){
            if(status == "success"){
                console.log("success")
                console.log(data);
                if(data.error){
                    alert(data.message.data)
                }else{
                    results = data.message;
                    console.log(results);
                    fill(results);
                }
            }
        },"json");

    });
});


