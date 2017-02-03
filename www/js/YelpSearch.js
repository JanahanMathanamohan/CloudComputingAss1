$(document).ready(function(){
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
                    console.log(data.message);
                    fill(data.message);
                }
            }
        },"json");
    });
    function fill(data){
        $('#resultHide').empty();
        var item = data.businesses;
        console.log(item);
        var panel2 = '<div id=lD class="panel panel-danger ps" ><div class="markerpoint panel-heading psh"><h3 class="panel-title psh"><b>Results</h3></div>';
        panel2 += '<div class="panel-body bottomLineR" id="l'+i+'SD">';
        panel2 += "<ul class='list-group'>";
        for(var i = 0; i < item.length;i++){
            var tmp = item[i];
            console.log(tmp)
            panel2 += '<li class="list-group-item">'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'">Link</a><br>'+tmp.SALARY+'</div><div class="col-md-4 text-center maxH"><button type="button">Interest</button></li>';
        }
        panel2 += '</ul>'
        panel2 += '</div>'
        panel2 += '</div>';
        console.log(panel2);
        $('#resultHide').append(panel2);
    }
    function remove(){

    }
    function addFav(){

    }
});

