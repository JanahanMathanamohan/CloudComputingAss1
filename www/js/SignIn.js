/**
 * Janahan Mathanamohan
 * SignIn.js
* This JS file contains the sign in and sign out function
*/

/**
* Handles the Google automated sign in
* @param {Google Object} googleUser
*/
function onSignIn(googleUser) {
    var loginStatus = localStorage.getItem('loggedin') ;
    console.log(":"+loginStatus);
    if(loginStatus == "loggedOut"){
        signOut();
    }else{
        var profile = googleUser.getBasicProfile();
        var id_token = googleUser.getAuthResponse().id_token;
        //Storing profile sent by google
        var prof = {
            ID: profile.getId(),
            Name: profile.getName(),
            Img: profile.getImageUrl(),
            Email: profile.getEmail()
        };
        localStorage.setItem('profile', JSON.stringify(prof));
        //Making the sign out link visible
        $('#signOut').removeClass('hidden');
        $('#signOut').addClass('show');
        //Getting login information
        $.post("https://cloudcompyelp.herokuapp.com/api/login",prof,function(data,status){
            if(status == "success"){
                localStorage.setItem('loggedin', "loggedIn");
                localStorage.setItem('data', JSON.stringify(data.message));
                window.location.href = "../home.html";
            }
        },"json");
    }
}

/**
* Handles the google user sign out.
**/
function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.setItem('loggedin',"");
        $('#signOut').removeClass('show');
        $('#signOut').addClass('hidden');
    });
}

/**
* Empties the sessions global variables
*/
function empty(){
        console.log('enter');
        localStorage.setItem('loggedin',"loggedOut");
        localStorage.setItem('data',"");
        localStorage.setItem('prof',"");
        window.location.href = "../index.html";
}
$(document).ready(function(){

});

