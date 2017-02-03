function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    var newStatus;
    var newData;

    //Storing profile sent by google
    var prof = {
        ID: profile.getId(),
        Name: profile.getName(),
        Img: profile.getImageUrl(),
        Email: profile.getEmail()
    };
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    sessionStorage.setItem('profile', JSON.stringify(prof));

    //Making the sign out link visible
    $('#signOut').removeClass('hidden');
    $('#signOut').addClass('show');

    //Getting login information
    $.post("http://cloudcompyelp.herokuapp.com/api/login",prof,function(data,status){
        if(status == "success"){
            sessionStorage.setItem('loggedin', "loggedIn");
            sessionStorage.setItem('data', JSON.stringify(data));
            console.log(data);
            window.location.href = "../home.html";
        }
    },"json");
}
function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        sessionStorage.setItem('loggedin',"loggedOut");
        sessionStorage.setItem('data',"");
        sessionStorage.setItem('prof',"");
        console.log('User signed out.');
        $('#signOut').removeClass('show');
        $('#signOut').addClass('hidden');
    });
}
$(document).ready(function(){
});

