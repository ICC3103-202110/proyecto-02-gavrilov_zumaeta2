//FUNCIONAL

function update(action, location, cityupdate, citydelete, model){
    if (action == 'Add City'){
        return{
            ...model,
            name: location,
            temp: 22,
            max: 24,
            min: 10,
            storedNames:['City 1','City 2','City 3']
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
