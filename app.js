//NO FUNCIONAL 

const {listMain,view} = require('./view')
const {printTable} = require('console-table-printer')
const {update} = require('./update')

async function app(state,update,view){
    while(true){
        const {model,currentView} = state
        const {title, table} = currentView
    //for the clear
        console.clear()
        console.log(title)
        printTable(table)
        const{Action,addLocation,cityUpdate, cityDelete} = await listMain(model)
        console.log(Action)
        const updatedModel = update(Action,addLocation,cityUpdate,cityDelete,model)
        state = {
        ...state,
        model: updatedModel,
        currentView: view(updatedModel)    
        }
    }
}

module.exports = {
    app
}
 