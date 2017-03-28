"use strict";

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: {type: String, text: true},
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = function(filter, skip, limit, sort, cb){
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.exec(cb);
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);