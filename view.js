//L: Maneja vista de consola de manera FUNCIONAL
const {Table} = require('console-table-printer')
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
    const temporal_table=new Table;
    temporal_table.addRows(model);
    return temporal_table;
}

function listMain(model){
    const{storedNames} = model
    if (Number(storedNames)!=0) {
    return inquirer.prompt(
        [
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
            message:'Location?'
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
else {
        return inquirer.prompt(
        [
        {type:'list',
        name:'Action',
        message:'Select action:',
        choices: ['Add City'],
        default: '(Use arrow keys)'
        },
        {
            when: input =>{
                return input.Action == 'Add City'
            },
            type:'input',
            name:'addLocation',
            message:'Location?'
            }
        ])
    }
}

function view(model,len){
    return {
        title: getTitle(),
        table: getTable(model.registry)
    }
}

module.exports = {
    view,
    listMain
}