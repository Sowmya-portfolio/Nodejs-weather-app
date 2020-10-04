const request = require('postman-request');
/*//adress to lat/log(geocoding)
const mapurl='https://api.mapbox.com/geocoding/v5/mapbox.places/1gh1.json?access_token=pk.eyJ1Ijoic293bXlhYXJ1bXVnYW0iLCJhIjoiY2tmcDB6aHF6MGU2eDJzbXFpNzN3Ym5zZiJ9.CNs7pX0eSI3Ct_qS_HxZsg&limit=1'
const data=request({url:mapurl,json:true},(error,urlresponse)=>{
    //console.log();
    if(error){
console.log("unable to connect to api");
    }
    else if(!urlresponse.body.features[0]){
console.log("location is wrong")
    }
else{
const response=urlresponse.body;
console.log("longitude: "+response.features[0].center[0]);
console.log("latitude: "+response.features[0].center[1]);
    }
    
})*/
const geoCode = (location, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    decodeURIComponent(location) +
    '.json?access_token=pk.eyJ1Ijoic293bXlhYXJ1bXVnYW0iLCJhIjoiY2tmcDB6aHF6MGU2eDJzbXFpNzN3Ym5zZiJ9.CNs7pX0eSI3Ct_qS_HxZsg&limit=1';
    console.log(url)
    const data = request({url, json: true}, (error, {body:data}={}) => {
  
    if (error) {
      callback('Not connected to weather service-check internet connection');
    } else if (data.features.length===0) {
      callback('Given location is wrong');
    } else {
      //const {body:data}=urlresponse;
      const geoData = {
        longitude: data.features[0].center[0],
        latitude: data.features[0].center[1],
        place: data.query,
      };
      callback(undefined, geoData);
    }
  });
};
module.exports = geoCode;
