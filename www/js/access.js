$(document).ready(function(){
    if(sessionStorage.getItem('loggedin') != 'loggedIn'){
        sessionStorage.setItem('loggedin',"loggedOut");
        sessionStorage.setItem('data',"");
        sessionStorage.setItem('prof',"");
        console.log("Not Logged in");
    }
});

