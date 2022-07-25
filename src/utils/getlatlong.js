const request = require("request");

const getLatLong = function (address, callback) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWxpY2h1Z2h0YWkiLCJhIjoiY2w1dGp5em10MjgxdTNibW5yYmdzbXc2dCJ9.KCY5q8fWzadEJ0SVjmarqA&limit=1";
  request({ url, json: true }, function (error, response, body) {
    if (error) {
      callback("unable to connect to location api", undefined);
    } else if (response.body.features.length === 0) {
      callback("no location found, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = getLatLong;



  
