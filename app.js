const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const questions = [{
        type: "list",
        name: "Role",
        message: "Please enter your role in the company",
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: "input",
        name: "Name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "ID",
        message: "Enter your ID number"
    },
    {
        type: "input",
        name: "Email",
        message: "Enter your email address"
    }
];

const specificQuestions = [{
        type: "input",
        name: "OfficeNumber",
        message: "What is your office number?"
    },
    {
        type: "input",
        name: "GitHub",
        message: "What is your GitHub ID?"
    },
    {
        type: "input",
        name: "School",
        message: "Which school are you from?"
    }
];

function promptUser() {
    return inquirer.prompt(questions);
}

function promptManger() {
    return inquirer.prompt(specificQuestions[0]);
}
async function init() {
    try {
        const answers = await promptUser();
        console.log(answers);
        if (answers.Role === "Manager") {
            const specificAnswer = await promptManger();
            console.log(specificAnswer);

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