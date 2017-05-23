const { PASSWORD_HASH, SALT } = require('../controllers/index');

/**
 * Credit to https://ciphertrick.com/2016/01/18/salt-hash-passwords-using-nodejs-crypto/
 */

const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} userPassword - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = function(userPassword, salt){
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(userPassword);
    const value = hash.digest('hex');
    return {
        [SALT]: salt,
        [PASSWORD_HASH]: value
    };
};

exports.sha512 = sha512;

exports.newSaltHashPassword = function(userPassword) {
    const salt = genRandomString(16); /** Gives us salt of length 16 */
    return sha512(userPassword, salt);
};