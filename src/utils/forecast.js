const request = require("request");

const forecast = function (lat, long, callback) {
  const url =
    "http://api.weatherstack.com/current?access_key=e7ef5f0330ed4e2b7b422db0c56afa6e&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long) +
    "&units=f";
 // console.log(url);
  request({ url: url, json: true }, function (error, response, body) {
    if (error) {
      callback("unable to connecto to weather stack", undefined);
    } else if (body.error) {
      callback(" unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out. It feels like " +
          body.current.feelslike +
          " degrees out. The humidity is " + body.current.humidity + " percent."
      );
    }
  });
};
module.exports = forecast;
