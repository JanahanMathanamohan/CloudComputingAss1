$(document).ready(function(){
    var loginStatus = sessionStorage.getItem('loggedin') ;
    console.log(loginStatus)
    if(loginStatus != 'loggedIn' || loginStatus != 'loggedOut'){
        sessionStorage.setItem('loggedin',"");
        sessionStorage.setItem('data',"");
        sessionStorage.setItem('prof',"");
        console.log("Not Logged in");
    }
});

