//L: Maneja vista de consola de manera FUNCIONAL

const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')

/* L: Para que la función sea pura no debe hacer ningun console.log()
    Tampoco cambiar una variable global*/
function getTitle(){
    return chalk.magenta(
        figlet.textSync("Weather app",{
            font: "straight",
            horizontalLayout: "full"
        })
    )
}

function getTable(model){
    const{name} = model
    const{temp} = model
    const{max} = model
    const{min} = model
    const tableData = {'name': name,'temp':temp,'max':max,'min':min}
    return[tableData]
}

function listMain(model){
    const{storedNames} = model
    return inquirer.prompt([
        {type:'list',
        name:'Action',
        message:'Select action:',
        choices: ['Add City','Update City','Delete City'],
        default: '(Use arrow keys)'
        },
        {
            when: input =>{
                return input.Action == 'Add City'
            },
            type:'input',
            name:'addLocation',
            message:'Location?',
            default:'',
        },
        {
            when: input =>{
                return input.Action =='Update City'
            },
            type:'list',
            name:'cityUpdate',
            message:'Update city:',
            choices: storedNames,
            default: '(Use arrow keys)',
        },
        {
            when: input =>{
                return input.Action =='Delete City'
            },
            type:'list',
            name:'cityDelete',
            message:'Delete city:',
            choices: storedNames,
            default: '(Use arrow keys)',
        }
    ])
}

/*L: Hago distintos inputs para trabajarlos con ifs 
    y awaits y clear.console() en app(?)*/
/*
function inputAdd(){
    return inquirer.prompt([
        {type:'input',
        name:'addLocation',
        message:'Location?',
        default:'',
        validate: function(value){
            if(isNaN(value) === false){
                return'Please enter a proper City'}
            else{return true}} //L: Este validate se puede usar para las ciudades que existan o no
        }
    ])
}

function listUpdate(model){
    const{storedNames} = model
    inquirer.prompt([
        {type:'list',
        name:'cityUpdate',
        message:'Update city:',
        choices: storedNames,
        default: '(Use arrow keys)'
        }
    ])
}

function listDelete(model){
    const{storedNames} = model
    inquirer.prompt([
        {type:'list',
        name:'cityDelete',
        message:'Delete city:',
        choices: storedNames,
        default: '(Use arrow keys)'
        }
    ])
}

*/
function view(model){
    return {
        title: getTitle(),
        table: getTable(model)
    }
}

module.exports = {
    view,
    listMain
}