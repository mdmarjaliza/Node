var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/nodepop';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.dropDatabase();
    var anuncios = db.collection('anuncios');
    var usuarios = db.collection('usuarios');
    usuarios.createIndex({nombre: "text"});
    anuncios.insertMany([
        {
            "nombre": "Bicicleta nueva",
            "venta": true,
            "precio": 230.15,
            "foto": "http://m1.paperblog.com/i/1/17437/bici-nueva-L-1.jpeg",
            "tags": [ "lifestyle", "motor"]
        },
        {
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50.00,
            "foto": "https://media.carphonewarehouse.com/is/image/cpw2/iphone-6GREY?$xl-standard$",
            "tags": [ "lifestyle", "mobile"]
        }
    ],  function(err, result) {
        assert.equal(err, null);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log("Inserted 2 documents into the document collection");
    });
    db.close();
});

