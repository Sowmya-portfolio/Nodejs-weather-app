const path=require('path');
const express = require('express');
const hbs=require('hbs');
const cast = require('./public/utils/weatherForeCast');
const geo = require('./public/utils/geoCode');
//const place=process.argv[2];
//add port as heroku port from environment variable 0r 3000(if that is not available)
const port=process.env.PORT || 3000;
//create server
const app=express()
//console.log(__dirname);
//__dirname:C:\Users\Wavicledata\Desktop\Node DB\Node js Course\Projects\express web server
//set view engine and viewspath(optional--default is views)
app.set('view engine','hbs');
const viewsPath=path.join(__dirname,'/templates/views')
app.set('views',viewsPath)

//set partialspath
const partialsPath=path.join(__dirname,'/templates/partials')
hbs.registerPartials(partialsPath)
//set dir path to serve
const directoryPath=path.join(__dirname,'/public');
console.log(directoryPath)
app.use(express.static(directoryPath))

//help route
app.get('/help',(req,res)=>{
  res.render('help',{
    title:'---HELP---',
    name:'Sowmya'
  });
  })

  //about route
app.get('/about',(req,res)=>{
  res.render('about',{
    title:'---ABOUT---',
    name:'Sowmya'
  });
  })

 //index route-default
 app.get('',(req,res)=>{
  res.render('index',{
    title:'---DEFAULT-INDEX---',
    name:'Sowmya'
  });
  }) 
//weather route
app.get('/weather',(req,res)=>{
//   if (!req.query.address) {
//     return res.send({
//         error: 'You must provide an address!'
//     })
// }

// // geo(req.query.address, (error, { latitude, longitude, location }) => {
// //     if (error) {
// //         return res.send({ error })
// //     }

// geo(req.query.address, (error, {longitude,latitude,location}={}) => {
//         if (error) {
//         return res.send("geo error: "+error);
//        } 

//     cast(latitude, longitude, (error, forecastData) => {
//         if (error) {
//             return res.send({ error })
//         }

//         res.send({
//             forecast: forecastData,
//             location,
//             address: req.query.address
//         })
//     })
// }) 
  if(req.query.address){
    geo(req.query.address, (error, {longitude,latitude,location}={}) => {
      if (error) {
        return res.send("geo error: "+error);
      } 
        cast(longitude, latitude, (error, data2) => {
          if (error) {
            return res.send("weather error: "+error);
          }
         //return  console.log('data: ' + data2);
         return res.send({
          title:'---WEATHER---',
          name:'Sowmya',
          forecast:data2,
          address:req.query.address
        })
        });
      
    });
  
}
else{
  return res.send({
    error: "please provide address"
  })
}
  })
  //help article page
  app.get('/help/*',(req,res)=>{
    res.render('404',{
      title:'---HELP ARTICLE---',
      name:'Sowmya',
      message:'Help article not found'
    })
  })
  //404-pages
  app.get('*',(req,res)=>{
    res.render('404',{
      title:'---404---',
      name:'Sowmya',
      message:'page not found'
    })
  })
app.listen(port,()=>{
    console.log("server is up on port" +port);
})