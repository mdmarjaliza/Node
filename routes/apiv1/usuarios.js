"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");

const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');

const lang = require('../../locales/lang');

const passwordHash = require('password-hash');


// Para consultar usuarios a través de la API, descomentar lo que sigue

router.get('/', function(req, res, next) {
    Usuario.find().exec(function(err, usuarios){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: usuarios});
    });
});


router.post('/', function(req, res, next) {
    const usuario = new Usuario(req.body);
    var claveEncriptada = passwordHash.generate(usuario.clave);
    usuario.clave = claveEncriptada;
    // console.log(usuario);
    // console.log(usuario.clave);
    // console.log(claveEncriptada);
    // console.log("Es la misma? => ", passwordHash.verify(usuario.clave, claveEncriptada));
    usuario.save(function (err, usuarioCreado){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: usuarioCreado});
    });
});


router.post('/authenticate', function(req, res, next){
    const userName = req.body.username;
    const password = req.body.password;

    const msg_error = "USER_PASS";

    const idioma = (req.headers["accept-language"]).split("-");

    var filter = {};

    //Buscar al usuario en la BD y comprobar que su contraseña es correcta
    filter = {nombre: userName};

    Usuario.list(filter, function(err, usuario){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        if ((usuario.length == '0') || (!passwordHash.verify(password, usuario[0].clave))) {
            next(new Error(lang(msg_error, idioma[0])));
        }
        else {
            if (passwordHash.verify(password, usuario[0].clave)) {
                // Si coincide creamos el token
                const token = jwt.sign({_id: usuario[0]._id}, localConfig.jwt.secret, {
                    expiresIn: localConfig.jwt.expiresIn
                });
                res.json({success: true, token: token});
            }
        }
    });
});

module.exports = router;
