var mongoose = require("mongoose");

const URL = 'mongodb://localhost/testperf';

exports.connect = async () => {
    const options = {useNewUrlParser: true, useUnifiedTopology: true}
    const mongo = mongoose.connect(URL,options);
    mongo.then(()=>{
        console.log('connected');
    },error =>{
        console.log(error, 'error');
    })  
};


