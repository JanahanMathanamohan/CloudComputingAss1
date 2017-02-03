$(document).ready(function(){
    $("#submit").click(function(){
        var toSend = {
            term: $("#term").val(),
            location: $("#location").val(),
            radius: $("#radius").val(),
            sort : 0,
            limit: $("#numpost").val()
        };
        $.post("https://cloudcompyelp.herokuapp.com/api/yelpSearch",toSend,function(data,status){
            if(status == "success"){
                console.log("success")
                if(data.error){
                    alert(data.msg)
                }else{
                    console.log(data.message);
                }
            }
        },"json");
    });
});

