const request = require('postman-request');
const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=af05d304c4a4b5574d4f1506b2e279bc&query=' +
    encodeURIComponent(lat) +
    ',' +
    encodeURIComponent(long) +
    '&units=f';
  const weatherData = request({url, json: true}, (error, {body:data}) => {
    //console.log(response.body)
    if (error) {
      callback('Not connected to weather service-check internet connection');
    } else if (data.error) {
      callback('Given location is wrong');
    } else {
      //const {body:data}=response;
      callback(
        undefined,
        'The temperature is ' +
        data.current.temperature +
          ' and it feels like ' +
        data.current.feelslike
      );
    }
  });
};
module.exports = forecast;
