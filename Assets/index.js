const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees } = require('./lib/queries');

async function promptUser() {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add Department',
            'Add Role',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View All Departments':
            await viewDepartments();
            break;
        case 'View All Roles':
            await viewRoles();
            break;
        case 'View All Employees':
            await viewEmployees();
            break;
        // Add cases for adding department, role, employee, and updating employee role
        case 'Exit':
            process.exit();
    }

    // Recursive call to continue prompting
    promptUser();
}

promptUser();
