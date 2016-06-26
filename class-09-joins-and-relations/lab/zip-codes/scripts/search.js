// (function(module) {


var Filter = {};
  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  // TODO: You will also interact with the map.js file here

Filter.populateState = function () {
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

Filter.setCity = function () {
  var result;
  $('#state-select').on('change', function() {
    // console.log("firing");
    $("#city-select").empty();
    $("#city-select").append('<option value="city">Select a City</option>');
    result = "'" + $(this).val() + "'";
    console.log(result);
    Filter.populateCity(result);
  })
}

Filter.populateCity = function(ele) {
  console.log(ele);
    webDB.execute('SELECT DISTINCT city FROM zips WHERE state =' + ele + ' ORDER BY city ASC;', function(cities) {
      console.log("Cities should follow:");
      console.log(cities);
      var cityArr = [];
      cities.map(function(a) {
        cityArr.push(a.city);
      })
      cityArr.forEach(function(name) {
        $('#city-select').append('<option value="' + name + '">' + name + '</option>');
      })
    })
  }
// })(window)
