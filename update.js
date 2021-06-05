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


async function update(action, location, cityupdate, citydelete, model,answer){
    if (action == 'Add City'){
        const newRegistry=await addCityTable(model,answer);
        return{
            ...model,
            registry:newRegistry.registry,
            //registry: newRegistry,
            /*name: location,
            temp: 22,
            max: 24,
            min: 10,*/
            storedNames:newRegistry.storedNames
    }}
    else if (action == 'Update City'){
        return{
            ...model,
            name: cityupdate,
            temp: 25,
            max: 25,
            min: 18,
            storedNames:['City 1','City 2','City 3']
    }}
    else if (action == 'Delete City'){
        return{
            ...model,
            name: citydelete,
            temp: 0,
            max: 0,
            min: 0,
            storedNames:['City 1','City 2']
    }}
}


module.exports = {
    update
}
