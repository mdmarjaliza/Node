"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model("Anuncio");

const jwtAuth = require('../../lib/jwtAuth');

router.use(jwtAuth());

router.get('/', function (req, res, next) {

    const venta = req.query.venta;
    const tag = req.query.tag;
    const precio = req.query.precio;
    const nombre = req.query.nombre;

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const sort = req.query.sort || null;



    const filter = {};

    // Añadimos el filtro para por compras o ventas
    // Convertimos el String de la query a un Boolean
    if (venta == "true"){
        filter.venta = true;
    }
    else if (venta == "false"){
        filter.venta = false;
    }

    // Añadimos el filtro por tags
    if (tag){
        filter.tags = tag;
    }

    // Filtro por precio
    if (precio !== undefined) {
        if (precio == '10-50') {
            filter.precio = {'$gte': '10', '$lte': '50'};
        }
        else if (precio == '10-') {
            filter.precio = {"$gte": '10'};
        }
        else if (precio == '-50') {
            filter.precio = {"$lte": '50'};
        }
        else if (precio == '50') {
            filter.precio = '50';
        }
    }


    // Filtro por nombre
    if (nombre){
        filter.nombre = new RegExp('^' + nombre, 'i');
    }

    Anuncio.list(filter, skip, limit, sort, function(err, anuncios){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: anuncios});
    });
});


router.post('/', function (req, res, next) {
   const anuncio = new Anuncio(req.body);
   anuncio.save(function (err, anuncioCreado){
       if (err){
           res.json({success: false, data: err});
           return;
       }
       res.json({success: true, data: anuncioCreado});
   });
});

module.exports = router;