var data = {

}
$(document).ready(function(){
    fill();
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
        var item = data2.businesses;
        console.log(item);
        var panel2 = '<div id=lD class="panel panel-danger ps" ><div class="markerpoint panel-heading psh"><h3 class="panel-title psh"><b>Results</h3></div>';
        panel2 += '<div class="panel-body bottomLineR" id="l'+i+'SD">';
        panel2 += "<ul class='list-group'>";
        for(var i = 0; i < item.length;i++){
            var tmp = item[i];
            console.log(tmp)
            panel2 += '<li class="list-group-item">'+tmp.name+'<br>Rating: '+tmp.rating+'<br>'+tmp.snippet_text+'<br>'+tmp.location.address+'<br><a href="'+tmp.url+'">Link</a><br>'+tmp.SALARY+'<div class="col-md-4 text-center maxH"><button type="button">Interest</button></li></div>';
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
    var data2 = {
         "businesses": [
        {
            "is_claimed": true,
            "rating": 4.0,
            "mobile_url": "https://m.yelp.com/biz/el-farolito-san-francisco-2?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "rating_img_url": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png",
            "review_count": 3947,
            "name": "El Farolito",
            "rating_img_url_small": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png",
            "url": "https://www.yelp.com/biz/el-farolito-san-francisco-2?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "categories": [
                [
                    "Mexican",
                    "mexican"
                ]
            ],
            "menu_date_updated": 1472584084,
            "phone": "4158247877",
            "snippet_text": "Definitely my favorite mex place in the city\n\nYou'd think they'd all be good! \n\nYou have to wait in that dreadful line, starving...watching them cook the...",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/c0rjUSiz2WyaAURKOTEvww/ms.jpg",
            "snippet_image_url": "https://s3-media3.fl.yelpcdn.com/photo/ulYG_-yRo840cY6LtJBawA/ms.jpg",
            "display_phone": "+1-415-824-7877",
            "rating_img_url_large": "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png",
            "menu_provider": "single_platform",
            "id": "el-farolito-san-francisco-2",
            "is_closed": false,
            "location": {
                "cross_streets": "24th St & 23rd St",
                "city": "San Francisco",
                "display_address": [
                    "2779 Mission St",
                    "Mission",
                    "San Francisco, CA 94110"
                ],
                "geo_accuracy": 9.5,
                "neighborhoods": [
                    "Mission"
                ],
                "postal_code": "94110",
                "country_code": "US",
                "address": [
                    "2779 Mission St"
                ],
                "coordinate": {
                    "latitude": 37.752654,
                    "longitude": -122.4181915
                },
                "state_code": "CA"
            }
        },
        {
            "is_claimed": true,
            "rating": 4.5,
            "mobile_url": "https://m.yelp.com/biz/tacorea-san-francisco?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "rating_img_url": "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png",
            "review_count": 397,
            "name": "Tacorea",
            "rating_img_url_small": "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png",
            "url": "https://www.yelp.com/biz/tacorea-san-francisco?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "categories": [
                [
                    "Mexican",
                    "mexican"
                ],
                [
                    "Korean",
                    "korean"
                ],
                [
                    "Latin American",
                    "latin"
                ]
            ],
            "menu_date_updated": 1472899698,
            "phone": "4158851325",
            "snippet_text": "GOT THAT ASIAN GLOW AISHHH\n(Pregame drink came off a bit strong because I didn't eat beforehand *smacks forehead*)\n\nHad this place bookmarked for awhile and...",
            "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/7sOn8_P7Hxb0ZkM55tz3mg/ms.jpg",
            "snippet_image_url": "https://s3-media4.fl.yelpcdn.com/photo/WR_XLcs0M5cq3LcSFKJ15A/ms.jpg",
            "display_phone": "+1-415-885-1325",
            "rating_img_url_large": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png",
            "menu_provider": "single_platform",
            "id": "tacorea-san-francisco",
            "is_closed": false,
            "location": {
                "cross_streets": "Taylor St & Mason St",
                "city": "San Francisco",
                "display_address": [
                    "809 Bush St",
                    "Union Square",
                    "San Francisco, CA 94108"
                ],
                "geo_accuracy": 9.5,
                "neighborhoods": [
                    "Union Square",
                    "Lower Nob Hill"
                ],
                "postal_code": "94108",
                "country_code": "US",
                "address": [
                    "809 Bush St"
                ],
                "coordinate": {
                    "latitude": 37.789806,
                    "longitude": -122.410709
                },
                "state_code": "CA"
            }
        },
        {
            "is_claimed": true,
            "rating": 4.0,
            "mobile_url": "https://m.yelp.com/biz/la-taqueria-san-francisco-2?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "rating_img_url": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png",
            "review_count": 2779,
            "name": "La Taqueria",
            "rating_img_url_small": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png",
            "url": "https://www.yelp.com/biz/la-taqueria-san-francisco-2?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "categories": [
                [
                    "Mexican",
                    "mexican"
                ]
            ],
            "phone": "4152857117",
            "snippet_text": "OMG the carnitas or carne asada super burrito dorado style is so money, as is the dorado style taco.  Often I can't resist and just pig out with one burrito...",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/nd2FRwFydOegXA1_t73g9g/ms.jpg",
            "snippet_image_url": "https://s3-media1.fl.yelpcdn.com/photo/dZEQ6MZpRXraPO47nljP9w/ms.jpg",
            "display_phone": "+1-415-285-7117",
            "rating_img_url_large": "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png",
            "id": "la-taqueria-san-francisco-2",
            "is_closed": false,
            "location": {
                "cross_streets": "24th St & 25th St",
                "city": "San Francisco",
                "display_address": [
                    "2889 Mission St",
                    "Mission",
                    "San Francisco, CA 94110"
                ],
                "geo_accuracy": 9.5,
                "neighborhoods": [
                    "Mission"
                ],
                "postal_code": "94110",
                "country_code": "US",
                "address": [
                    "2889 Mission St"
                ],
                "coordinate": {
                    "latitude": 37.750883,
                    "longitude": -122.418123
                },
                "state_code": "CA"
            }
        },
        {
            "is_claimed": false,
            "rating": 4.0,
            "mobile_url": "https://m.yelp.com/biz/street-taco-san-francisco?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "rating_img_url": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png",
            "review_count": 375,
            "name": "Street Taco",
            "rating_img_url_small": "https://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png",
            "url": "https://www.yelp.com/biz/street-taco-san-francisco?adjust_creative=7n1SJvJ2qyvHsjTn_YLb-A&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=7n1SJvJ2qyvHsjTn_YLb-A",
            "categories": [
                [
                    "Mexican",
                    "mexican"
                ]
            ],
            "phone": "4155254435",
            "snippet_text": "We came to The Haight on a Wednesday night (our first trip to SF from San Diego). \nWhen it comes to tacos- us San Diegans get real picky. I've heard stories...",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/Q9rNNPNstGYNHiphnkFabA/ms.jpg",
            "snippet_image_url": "https://s3-media2.fl.yelpcdn.com/photo/8Z60ENpR9IfD4hbgjMNl_g/ms.jpg",
            "display_phone": "+1-415-525-4435",
            "rating_img_url_large": "https://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png",
            "id": "street-taco-san-francisco",
            "is_closed": false,
            "location": {
                "cross_streets": "Clayton St & Belvedere St",
                "city": "San Francisco",
                "display_address": [
                    "1607 Haight St",
                    "The Haight",
                    "San Francisco, CA 94117"
                ],
                "geo_accuracy": 9.5,
                "neighborhoods": [
                    "The Haight"
                ],
                "postal_code": "94117",
                "country_code": "US",
                "address": [
                    "1607 Haight St"
                ],
                "coordinate": {
                    "latitude": 37.7696105177356,
                    "longitude": -122.448901621221
                },
                "state_code": "CA"
            }
        }
    }
});

