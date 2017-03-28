"use strict";

const mongoose = require("mongoose");
const conn = mongoose.connection;

conn.on('error', function(err){
   console.log(err);
});

conn.once('open', function(){
   console.log('Connected to mongodb.');
});
mongoose.connect('mongodb://localhost:27017/nodepop');