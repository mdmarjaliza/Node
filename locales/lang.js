"use strict";

module.exports = function (msg, idioma) {

    var error;
    switch(msg) {
        case "NO_TOKEN":
            if (idioma == "es") {
                error = "No se ha proporcionado ningún token";
            } else {
                error = "No token provided"
            }
            break;
        case "INVALID_TOKEN":
            if (idioma == "es") {
                error = "El token no es válido";
            } else {
                error = "No token provided"
            }
            break;
        case "USER_PASS":
            if (idioma == "es") {
                error = "Usuario o contraseña incorrectos";
            } else {
                error = "User or password not correct"
            }
            break;
    }
    return error;
}