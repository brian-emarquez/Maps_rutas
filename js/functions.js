var map;
var america_lat = -17.6680839;
var america_lng = -71.34680909999;
var directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions:{strokeColor:'#2E9AFE'}});
var directionsService = new google.maps.DirectionsService();

function start_map(){
    map = new google.maps.Map(document.getElementById('map'),{
        center: {lat: america_lat, lng: america_lng},
        zoom:4
    });
}

function get_my_location(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
        $('#my_lat').val(position.coords.latitude);
        $('#my_lng').val(position.coords.longitude);
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: pos
        });
      });
    }
}

function draw_rute(value){
    if(value > 0){
        $.ajax({
        type:'POST',
        url:'class/google.php',
        data: 'value=' +value,
        dataType:'JSON',
        success : function(response){
            draw_rute_map(response.lat, response.lng);
        }
     });
  }
}
function draw_rute_map(lat, lng){
    var my_lat =$('#my_lat').val();
    var my_lng =$('#my_lng').val();
        var start = new google.maps.LatLng(my_lat, my_lng);
        var end = new google.maps.LatLng(lat, lng);
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.travelMode.DRIVING
        };
        DirectionsService.route(request, function(response, status){
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
                directionsDisplay.setOptions({SuppressMakers: false});
            }
        });  
    }