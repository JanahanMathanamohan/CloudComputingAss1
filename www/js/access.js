/**
* Janahan Mathanamohan
* access.js
* This JS file ensures that only logged in users can gain access to the site
*/
$(document).ready(function(){
    var loginStatus = localStorage.getItem('loggedin') ;
    if(loginStatus != 'loggedIn' ){
        if(loginStatus != 'loggedOut'){
            localStorage.setItem('loggedin',"loggedOut");
            localStorage.setItem('data',"");
            localStorage.setItem('prof',"");
            console.log("Not Logged in");
        }
        window.location.href = "../index.html";
    }else{
        console.log("enter");
        var login =JSON.parse(localStorage.getItem('profile'));
        var panel = '<b>Welcome: '+login.Name+ ' </b>' ;
        $('#intro').append(panel);
    }
});

