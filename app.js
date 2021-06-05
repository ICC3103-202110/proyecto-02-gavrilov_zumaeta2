//NO FUNCIONAL 
const axios = require('axios').default;
const {listMain,view} = require('./view')
const {printTable} = require('console-table-printer')
const {Table} = require('console-table-printer')
const {update} = require('./update')

async function getRequest(city) {
    try {
    const res = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b275a97dce742e0ae8a7a3ace7437f7d`);
    
    
    const data = await res.data;
    const temperature=await data.main.temp-273;
    const tempMax=await data.main.temp_max-273;
    const tempMin=await data.main.temp_min-273;
    
    return {tname:city,ttemp:Math.round(temperature*100)/100,tmax:Math.round(tempMax*100)/100,tmin:Math.round(tempMin*100)/100};
      } catch (error){
        return -1; //lo devolvemos para no agregarlo a la lista de ciudades ya que no existe
      }
  }

async function app(state,update,view){
    while(true){
        const {model,currentView} = state
        const {title, table} = currentView
    //for the clear
        console.clear()
        console.log(title)
        table.printTable();
        const{Action,addLocation,cityUpdate, cityDelete} = await listMain(model)
        console.log(Action)
        if (Action==="Add City") {
            const try_data=await getRequest(addLocation);
            
            if (try_data!=-1){
                try {const updatedModel = await update(Action,addLocation,cityUpdate,cityDelete,model,try_data);
                    
                    state = {
                        ...state,
                        model: updatedModel,
                        currentView: view(updatedModel)    
                        }
                    }
                catch (error){console.log("no se pudo hacer operacion")}
                
            }
        }
        
        //const updatedModel = update(Action,addLocation,cityUpdate,cityDelete,model)
        state = {
        ...state,
        //model: updatedModel,
        //currentView: view(updatedModel)    
        }
    }
}

module.exports = {
    app
}
 