
"use strict";

const mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre: {type: String, text: true},
    email: String,
    clave: String
});


usuarioSchema.statics.list = function(filter, cb){
    const query = Usuario.find(filter);
    query.exec(cb);
}

var Usuario = mongoose.model('Usuario', usuarioSchema);