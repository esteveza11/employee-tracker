const { Pool } = require('pg');
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

async function viewDepartments() {
    const res = await pool.query('SELECT * FROM department');
    console.table(res.rows);
}

async function viewRoles() {
    const res = await pool.query(`
        SELECT role.id, role.title, department.name AS department, role.salary 
        FROM role 
        JOIN department ON role.department_id = department.id
    `);
    console.table(res.rows);
}

async function viewEmployees() {
    const res = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
        COALESCE(manager.first_name || ' ' || manager.last_name, 'None') AS manager 
        FROM employee 
        JOIN role ON employee.role_id = role.id 
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
    console.table(res.rows);
}

// Add department, role, employee, and update employee role functions...

module.exports = { viewDepartments, viewRoles, viewEmployees };
