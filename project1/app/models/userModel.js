
const db = require('../../db/connection');

const userModel = {
    getAllUsers: (callback) => {
        db.query('SELECT * FROM users', (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                callback(error, null);
                return;
            }

            callback(null, results);
        });
    },

    getUserById: (userId, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [userId], (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                callback(error, null);
                return;
            }

            if (results.length === 0) {
                callback({ message: 'User not found' }, null);
                return;
            }

            callback(null, results[0]);
        });
    },

    createUser: (userData, callback) => {
        db.query('INSERT INTO users SET ?', userData, (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                callback(error, null);
                return;
            }

            callback(null, { message: 'User created successfully', userId: results.insertId });
        });
    },

    updateUser: (userId, userData, callback) => {
        db.query('UPDATE users SET ? WHERE id = ?', [userData, userId], (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                callback(error, null);
                return;
            }

            callback(null, { message: 'User updated successfully' });
        });
    },

    deleteUser: (userId, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [userId], (error, results, fields) => {
            if (error) {
                console.error('Error executing query:', error);
                callback(error, null);
                return;
            }

            callback(null, { message: 'User deleted successfully' });
        });
    }
};

module.exports = userModel;
