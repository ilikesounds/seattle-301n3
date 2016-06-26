// (function(module) {

var MarkerObj = {};
var Filter = {};
// TODO: Write the code to populate your filters, and enable the search queries here in search.js
// TODO: You will also interact with the map.js file here

Filter.searchBox = function() {
  var result;
  $('form').on('submit', function(e) {
    e.preventDefault();
    result = $('#zipSearch').val();
    if (isNaN(parseInt(result)) === true || result.length != 5) {
      alert('You must enter a valid 5 digit zip code!');
      result = null;
    } else {
      webDB.execute('SELECT zip, latitude, longitude FROM zips WHERE zip=' + result + ';', function(zipCodes) {
        console.log(zipCodes);
        if (zipCodes.length === 0) {
          alert('That zip code does not exist in our database, please try another zip code.');
          zipCodes = null;
        } else {
          dropMarkers(zipCodes[0].latitude, zipCodes[0].longitude);
        }
      })
    }
  })
}

Filter.populateState = function() {
  webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state ASC;', function(states) {
    var stateArr = [];
    states.map(function(a) {
      stateArr.push(a.state);
    })
    stateArr.forEach(function(ele) {
      $('#state-select').append('<option value="' + ele + '">' + ele + '</option>');
    });
  })
  Filter.setCity();
}

Filter.setCity = function() {
  var result;
  $('#state-select').on('change', function() {
    $("#initial-city").siblings().remove();
    result = "'" + $(this).val() + "'";
    Filter.populateCity(result);
  })
}

Filter.populateCity = function(ele) {
  webDB.execute('SELECT DISTINCT city FROM zips WHERE state =' + ele + ' ORDER BY city ASC;', function(cities) {
    var cityArr = [];
    cities.map(function(a) {
      cityArr.push(a.city);
    })
    cityArr.forEach(function(name) {
      $('#city-select').append('<option value="' + name + '">' + name + '</option>');
    })
  })
  Filter.selectCity();
}

Filter.selectCity = function() {
    var resultCity;
    var resultState = $('#state-select').val();
    $('#city-select').on('change', function() {
      resultCity = $(this).val();
      webDB.execute('SELECT * FROM zips WHERE city =' + '"' + resultCity + '"' + ' AND state =' + '"' + resultState + '";',
        function(cities) {
          var marker = {};
          var myLatlng = {};
          for (var i = 0; i < cities.length; i++) {
            console.log(marker);
            var myLatlng2 = {
              'lat': cities[0][1],
              'lng': cities[0][2]
            }
            console.log(cities[i][1], cities[i][2]);

            var mapOptions = {
              zoom: 4,
              center: myLatlng2
            }
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            marker["marker" + i] = new google.maps.Marker({
              position: myLatlng["myLatlng" + i] = new google.maps.LatLng(cities[i][1], cities[i][2]),
              map: map,
            });
            // console.log(cities[i]);
            // dropMarkers(cities[i].latitude, cities[i].longitude);
          }

        })
    })
  }
  // })(window)
