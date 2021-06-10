//FUNCIONAL

function addCityTable(model,input){
    const {tname,ttemp,tmax,tmin}=input;
    
    const temporalModel= model;
    temporalModel.registry.push({name: tname,
        temp: ttemp,
        max: tmax,
        min: tmin});
    temporalModel.storedNames.push(tname);
    return temporalModel;
}
function deleteCity (model,input){
    const foundIn=model.storedNames.indexOf(input);
    const temporalModel= model;
    temporalModel.registry.splice(foundIn,1);
    temporalModel.storedNames.splice(foundIn,1);
    return temporalModel;
}
function updateCity (model,city,input){
    const {tname,ttemp,tmax,tmin}=input;
    const itemToAdd= {name: tname,
        temp: ttemp,
        max: tmax,
        min: tmin};
    const foundIn=model.storedNames.indexOf(city);
    const temporalModel= model;
    temporalModel.registry.splice(foundIn,1,itemToAdd);
    return temporalModel;
}


async function update(action, location, cityupdate, citydelete, model,answer=0){
    if (action == 'Add City'){
        const registryAdded=await addCityTable(model,answer);
        console.log(registryAdded);
        return registryAdded;
    }
    else if (action == 'Update City'){
        const updatedRegistry= updateCity(model,cityupdate,answer);
        return updatedRegistry;
    }
    else if (action == 'Delete City'){
        const modelCityDeleted=deleteCity(model,citydelete);
        console.log(modelCityDeleted);
        return modelCityDeleted;
    }
}


module.exports = {
    update
}
