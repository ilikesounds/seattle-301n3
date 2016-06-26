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

  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
}

function dropMarkers(lat, lng) {
  var marker = {};
  var myLatlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var marker['marker' + i] = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: cityName,
  });
  marker.setMap(map);
}
