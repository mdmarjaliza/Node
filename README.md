**INSTRUCCIONES DE USO**

1.- Arrancar servidor de MongoDB en puerto 27017.

2.- Inicializar la BD haciendo lo siguiente:

        2.1.- Ejecutar:
            npm run installDB
         Esto limpiará las tablas si las hubiera e introducirá dos anuncios en ella.
         
3.- A partir de ahí se puede probar en el navegador ejecutando:
    npm run start
    
    Y siguiendo las rutas:
    
    http://localhost:3000/apvi1/usuarios
    http://localhost:3000/apiv1/usuarios/authenticate
    http://localhost:3000/apiv1/anuncios
    
4.- Esas mismas rutas son las que se pueden usar para usar la API vía Postman o similares.


Para los distintos usuarios se ha decidido que el nombre de usuario no puede repetirse en lugar del email.
No obstante, no se lleva a cabo esta comprobación puesto que solo estamos probando lo que devuelve. Si se desea, se
puede incluir más adelante.

Para la internacionalización quería usar el módulo i18n pero no conseguía hacerlo funcionar. Fallaba continuamente así
que esto se ha hecho de forma manual.
