//L: Importamos los demás archivos:

const{initModel} = require('./model')
const{update} = require('./update')
const{view} = require('./view')
const{app} = require('./app')

const state = {
    model: initModel,
    currentView: view(initModel)
}

app(state,update,view);

/*L: Main es mi punto de entrada. Se inicializa con el estado inicial
    Luego se llama a la función app con el estado constante.
    Acá se le pasala función state, update y view.
    Le paso la función como parámetro; la puedo tratar como una 'variable'.
*/