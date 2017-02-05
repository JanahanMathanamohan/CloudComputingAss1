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
                    results = data.message;
                    console.log(results);
                    fill(results);
                }
            }
        },"json");
    });

    $("#result").on("click",".resultB", function(){
        console.log(this.id);
        var id = this.id;
        var num= id.substring(id.indexOf('R')+1);
        num= parseInt(num);
        var tmp = results[num];
        $('#R'+num).addClass("hide");
        var panel = '<li class="list-group-item" ><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" class="unresultB" id=M'+order+'>Interest</button></li>';
        $('#u').add(panel);
        update.push(tmp);
        order++;
        count++;
    });

    $("#update").on("click",".unresultB", function(){
        console.log(this.id);
        var id = this.id;
        var num= id.substring(id.indexOf('M')+1);
        num= parseInt(num);

        $('#M'+count).remove();
        $('#R'+count).removeClass("hide");
        $('#R'+count).addClass("show");
        var x = update.indexOf(count);
        if(x != -1){
            update.splice(x,1);
        }

    });
    function fill(data){
        $('#results').empty();
        var item = data.businesses;
        var panel2 = "";
        console.log(item);
        for(var i = 0; i < item.length;i++){
            var tmp = item[i];
            panel2 += '<li class="list-group-item" id=R'+i+'><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" id="R'+i+'" class="resultB">Interest</button></li>';
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


