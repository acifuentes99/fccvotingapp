var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var pollSchema = mongoose.Schema({
    creator: String, //Mail del usuario creador
    pollname: String,
    hola: Array
    /*
    options: {
        /*Insert in format:
         * optname: String, //Nombre de la opción
         * votes: Number //Cantidad de votos de la opcion. Por defecto son 0.
        * */
});

// methods ======================

module.exports = mongoose.model('Poll', pollSchema);
