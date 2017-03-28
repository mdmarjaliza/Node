"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

const lang = require('../locales/lang');

// Modulo que exporta un middleware de autenticación
module.exports = function() {
    return function(req, res, next){
        const token = req.body.token || req.query.token || req.get('x-access-token');
        var msg_error;
        const idioma = (req.headers["accept-language"]).split("-");

        if (!token) {
            msg_error = "NO_TOKEN";
            next(new Error(lang(msg_error, idioma[0])));
            return;
        }
        jwt.verify(token, localConfig.jwt.secret, function(err, tokenDecoded){
           if (err) {
               msg_error = "INVALID_TOKEN";
               err.status=403;  // Quiero codigo de error pero envia un 500. No se como se hace.
               next(new Error(lang(msg_error, idioma[0])));
               return;
           }
           req.tokenDecoded = tokenDecoded;
           next();
        });
    }
};
