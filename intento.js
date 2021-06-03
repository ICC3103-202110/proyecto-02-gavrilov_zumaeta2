

// id b275a97dce742e0ae8a7a3ace7437f7d
const axios = require('axios').default;
// axios('api.openweathermap.org/data/2.5/weather?q={city name}&appid=b275a97dce742e0ae8a7a3ace7437f7d')

// forma 1
async function makeGetRequest(city) {
    try {
    const res = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b275a97dce742e0ae8a7a3ace7437f7d`);
  
    const data = await res.data;
    const info=await data.main.temp;
    //se ejecuta segundo
    //console.log(info);
    /*const def= await data.temp;
    
    //console.log(data);*/
    return info;
      } catch (error){
        return -1; //lo devolvemos para no agregarlo a la lista de ciudades ya que no existe
      }
  }

async function wrap(){
    const results=await makeGetRequest("Santiago");
    //se ejecuta tercero
    if (results===-1) return -1;
    const value =results-273;
    console.log(value);
    return value;

}
//se ejecuta primero
console.log(wrap());

  
    

//forma 2
axios.get('http://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=b275a97dce742e0ae8a7a3ace7437f7d').then(resp => {
    //console.log(resp.data);
  //return resp.data;
});

axios.post('http://api.openweathermap.org/data/2.5/weather?q=Santiago&appid=b275a97dce742e0ae8a7a3ace7437f7d', {
  data: {main: { temp: 55
  }}
})
.then(function (response) {
  //console.log(response);
})
.catch(function (error) {
  console.log(error);
});






