$(document).ready(function(){
    var loginStatus = localStorage.getItem('loggedin') ;
    if(loginStatus != 'loggedIn' || loginStatus != 'loggedOut'){
        localStorage.setItem('loggedin',"");
        localStorage.setItem('data',"");
        localStorage.setItem('prof',"");
        console.log("Not Logged in");
    }
});

