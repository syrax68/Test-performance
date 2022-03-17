//index.js
//Import Express
const express = require('express')
//Import routes
const apiRoutes = require("./config/routes")
const bodyParser = require('body-parser')
const database = require('./config/database')
const cors = require('cors')
const { resolve } = require('path');
const { createReadStream, stat } = require('fs')

//Start App
let app = express();

app.use(cors())
//Assign port
var port = process.env.PORT || 8080;


//video streming
app.use(async (request,response, next)=>{
    if(
        !request.url.startsWith('/api/video') || 
        !request.query.video ||
        !request.query.video.match(/^[a-z0-9-_ ]+\.(mp4|mov)$/i)
    ){
        return next();
    }

    const video = resolve('public/videos',request.query.video)
    let range = request.headers.range;
    if(!range) range = 'bytes=0-'
    let positions = range.replace(/bytes=/, "").split("-");

    var start = parseInt(positions[0], 10);

    stat(video, function(err, stats) {
        if (err) {
            throw err;
        } else {
            var total = stats.size;
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end - start) + 1;
            response.writeHead(206, {
                "Content-Range" : "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges" : "bytes",
                "Content-Length" : chunksize,
                "Content-Type" : "video/mp4"
            });
            var stream = createReadStream(video, {
                start : start,
                end : end
            }).on("open", function() {
                stream.pipe(response);
            }).on("error", function(err) {
                response.end(err);
            });
        }
    });
})

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));

//Use API routes in the App
app.use('/api', apiRoutes)

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json());

async function BootLoader() {
    // Database connection
    await database.connect();
    
   // Launch app to the specified port
    app.listen(port, function() {
        console.log("Running FirstRest on Port "+ port);
    })
  }
  
  BootLoader();