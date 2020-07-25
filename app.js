const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerSpecific = [{
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "idNumber",
        message: "Enter the your ID number"
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the office number under your management?"
    },
    {
        type: "list",
        name: "role",
        message: "You can now add your employees information.\n Please enter the employee role in your office",
        choices: ['Engineer', 'Intern']
    }
];

const engineerSpecific = [{
        type: "input",
        name: "name",
        message: "What is the employee name?"
    },
    {
        type: "input",
        name: "idNumber",
        message: "Enter the employee ID number"
    },
    {
        type: "input",
        name: "email",
        message: "Enter the employee email address"
    },
    {
        type: "input",
        name: "github",
        message: "What is the engineer's GitHub' ID?"
    },
    {
        type: "list",
        name: "continueOrNot",
        message: "Do you want to continue adding more employees?",
        choices: ['Yes', 'No']
    }
]

const internSpecific = [{
        type: "input",
        name: "name",
        message: "What is the employee name?"
    },
    {
        type: "input",
        name: "idNumber",
        message: "Enter the employee ID number"
    },
    {
        type: "input",
        name: "email",
        message: "Enter the employee email address"
    },
    {
        type: "input",
        name: "school",
        message: "Which school is the intern from?"
    },
    {
        type: "list",
        name: "continueOrNot",
        message: "Do you want to continue adding more employees?",
        choices: ['Yes', 'No']
    }
]

const employeeAddQuestion = [{
    type: "list",
    name: "role",
    message: "Please enter the employee role in your office",
    choices: ['Engineer', 'Intern']
}]

function promptManger() {
    return inquirer.prompt(managerSpecific);
}

function promptEngineer() {
    return inquirer.prompt(engineerSpecific);
}

async function addEngineer() {
    const specificAnswer = await promptEngineer();
    employeeList.push(new Engineer(specificAnswer.name, specificAnswer.idNumber, specificAnswer.email, specificAnswer.github));
    console.log(employeeList);
    if (specificAnswer.continueOrNot === "Yes") {
        const employeeRole = await prmotToAddNewRoles();
        if (employeeRole.role === "Engineer") {
            addEngineer();
        } else {
            addIntern();
        }
    } else {
        outputHTML();
    }
}

function promptIntern() {
    return inquirer.prompt(internSpecific);
}

async function addIntern() {
    const specificAnswer = await promptIntern();
    employeeList.push(new Intern(specificAnswer.name, specificAnswer.idNumber, specificAnswer.email, specificAnswer.school));
    console.log(employeeList);
    if (specificAnswer.continueOrNot === "Yes") {
        const employeeRole = await prmotToAddNewRoles();
        if (employeeRole.role === "Intern") {
            addIntern();
        } else {
            addEngineer();
        }
    } else {
        outputHTML();
    }
}

async function prmotToAddNewRoles() {
    return inquirer.prompt(employeeAddQuestion);
}

function outputHTML() {
    const returnedHTML = render(employeeList);
    fs.writeFile(outputPath, returnedHTML, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

async function init() {
    try {
        const specificAnswer = await promptManger();
        employeeList.push(new Manager(specificAnswer.name, specificAnswer.idNumber, specificAnswer.email, specificAnswer.officeNumber));
        console.log(employeeList);
        if (specificAnswer.role === "Engineer") {
            addEngineer()
        } else {
            addIntern();
        }

    } catch (err) {
        console.log(err);
    }
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```