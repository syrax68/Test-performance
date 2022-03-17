var mongoose = require("mongoose");
require('dotenv').config();

const URL = process.env.MONGODB_URL;

exports.connect = async () => {
    const options = {useNewUrlParser: true, useUnifiedTopology: true}
    const mongo = mongoose.connect(URL,options);
    mongo.then(()=>{
        console.log('connected');
    },error =>{
        console.log(error, 'error');
    })  
};


