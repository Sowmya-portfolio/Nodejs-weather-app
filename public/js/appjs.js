console.log('connected to client js......');

const form = document.querySelector('form');
const search = document.querySelector('input');
const msgOne=document.querySelector('#pOne');
const msgTwo=document.querySelector('#pTwo');
//e-event object returned to callback
form.addEventListener('submit', (e) => {
  e.preventDefault();
  msgOne.textContent='Loading......'
  func2(search.value);
});

const func2 = (location) => {
  const url =
    'http://api.weatherstack.com/current?access_key=af05d304c4a4b5574d4f1506b2e279bc&query=' +
    location +
    '&limit=1';
  fetch(url).then((response) => {
    console.log(response);
    response.json().then((responseJson) => {
      if (responseJson.error) {
        console.log(responseJson.error);
        msgOne.textContent=responseJson.error.info;
      } else {
        console.log(responseJson);
        console.log(responseJson.location.name);
        msgOne.textContent="Weather Desc: "+responseJson.current.weather_descriptions[0];
        msgTwo.textContent="Location: "+responseJson.location.name;

      }
    });
  });
};

//default parameters
// const data={
//     name:"Sowmya",
//     location:"Coimbatore"
// }

// const func=(value=60,{name="murali",location="kovai"}={})=>{
// console.log("name is "+name+" location is "+location+" value is "+value);
// }
// func(9);
