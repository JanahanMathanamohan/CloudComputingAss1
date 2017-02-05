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
    $("#interest").click(function(){

    })
    function fill(data){
        $('#result').empty();
        var item = data.businesses;
        var panel2;
        console.log(item);
        for(var i = 0; i < item.length;i++){
            var tmp = item[i];
            panel2 += '<li class="list-group-item" id=R'+i+'><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" onclick=interest('+i+','+tmp+')>Interest</button></li>';
            console.log(tmp);
        }
        $('#result').append(panel2);
    }
    function interest(num, tmp){
        console.log(num);
        console.log(tmp);
        $('#R'+num).addClass("hide");
        var panel = '<li class="list-group-item" id=M'+order+'><img src='+tmp.image_url+' />'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'" target=_blank>Link</a><br><button type="button" onclick=interest('+order+')>Interest</button></li>';
        $('#u').add(panel);
        update.push(tmp);
        order++;
        count++;
    }
    function remove(count){
        $('#M'+count).remove();
        $('#R'+count).removeClass("hide");
        $('#R'+count).addClass("show");
        var x = update.indexOf(count);
        if(x != -1){
            update.splice(x,1);
        }
    }
    function addFav(){
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

    }
});


