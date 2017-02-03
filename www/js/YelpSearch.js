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
        console.log(data.buisness);
        $('#resultHide').empty();
        var item = data.buisness;
        var panel2 = '<div id=lD class="panel panel-danger ps" ><div class="markerpoint panel-heading psh"><h3 class="panel-title psh"><b>Results</h3></div>';
        for(var i = 0; i < item.length;i++){
            var tmp = item[i];
            panel2 += '<div class="panel-body bottomLineR" id="l'+i+'SD">';
            panel2 += '<div  class="col-md-8">'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'">Link</a><br>'+tmp.SALARY+'</div><div class="col-md-4 text-center maxH"><button type="button">Interest</button></div></div>';
            panel2 += '<div class="col-md-4 text-center maxH"><button type="button" id="l'+i+'S" class="discardB btn btn-primary ">ADD</button></div></div>';
        }
        panel2 += '</div>';
        console.log(panel2);
        $('#resultHide').append(panel2);
    }
    function remove(){

    }
    function addFav(){

    }
});

