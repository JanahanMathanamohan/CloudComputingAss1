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
    }
});

