//NO FUNCIONAL 
const axios = require('axios').default;
const {listMain,view} = require('./view')
const chalk = require('chalk')
const {printTable} = require('console-table-printer')
const {Table} = require('console-table-printer')
const {update} = require('./update')

async function getRequest(city) {
    try {
    const res = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b275a97dce742e0ae8a7a3ace7437f7d&units=metric`);
    
    
    const data = await res.data;
    const temperature=await data.main.temp;
    const tempMax=await data.main.temp_max;
    const tempMin=await data.main.temp_min;
    
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
        const num = Number(model.storedNames.length);
        if (num===0) {console.log(chalk.gray("NO CITIES"))}
        else {table.printTable();}
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

        if (Action==="Delete City") {
            const updatedModel = await update(Action,addLocation,cityUpdate,cityDelete,model,);
                    state = {
                        ...state,
                        model: updatedModel,
                        currentView: view(updatedModel)    
                        }
        }
        if (Action==="Update City") {
            const try_data=await getRequest(cityUpdate);
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
    }
}

module.exports = {
    app
}
 