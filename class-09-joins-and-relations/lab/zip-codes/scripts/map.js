function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 47.611435,
      lng: -122.330456
    },
    scrollwheel: true,
    zoom: 8
  });

  // TODO: DONE Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
}

function dropMarkers(objects) {
  var marker = {};
  var lat0 = objects[0].latitude;
  var lng0 = objects[0].longitude;
  var myLatlng = new google.maps.LatLng(lat0, lng0);
  console.log(myLatlng);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  for (var i = 0; i < objects.length; i++) {
    marker["marker" + i] = new google.maps.Marker({
      position: {lat: objects[i].latitude, lng: objects[i].longitude},
      map: map
    });
  }

}
