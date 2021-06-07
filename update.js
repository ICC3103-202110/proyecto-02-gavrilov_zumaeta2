//FUNCIONAL

function addCityTable(model,input){
    const {tname,ttemp,tmax,tmin}=input;
    
    const temporalTable= model;
    temporalTable.registry.push({name: tname,
        temp: ttemp,
        max: tmax,
        min: tmin});
    temporalTable.storedNames.push(tname);
    return temporalTable;
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
        const newRegistry=await addCityTable(model,answer);
        return{
            ...model,
            registry:newRegistry.registry,
    
            storedNames:newRegistry.storedNames
    }}
    else if (action == 'Update City'){
        const updatedRegistry= updateCity(model,cityupdate,answer);
        return{
            ...model,
            resigstry:updatedRegistry.registry
    }}
    else if (action == 'Delete City'){
        const modelCityDeleted=deleteCity(model,citydelete);
        return{
            ...model,
            registry:modelCityDeleted.registry,
            storedNames:modelCityDeleted.storedNames
    }}
}


module.exports = {
    update
}
