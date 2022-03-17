Webcast = require ('./webcast.model');

exports.index = function (req, res){
    Webcast.get(function(err, webcast){
        if(err){
            res.json({
                status: "error",
                message: err
            });
        }

        res.json({
            status: "success",
            message: "Got WEBCAST",
            data: webcast
        });
    });
};

exports.add = function(req, res){
    var webcast = new Webcast();

    webcast.name = 'test';
    webcast.url = 'test.mp4';
    webcast.nb_visitteur = 0;

    webcast.save((error)=>{
        if(error){
            res.json(error);
        }

        res.json({
            message:"New webcast",
            data: webcast
        })
    })
}

exports.update = function(req, res){
    Webcast.findById(req.params.webcast_id, function(err, webcast){
        if(err){
            res.send(err);
        }

        webcast.nb_visitteur = webcast.nb_visitteur+1;
        webcast.save(function(err){
            if(err){
                res.json(err);
            }
            res.json({
                message: "sucess",
                data: webcast
            })
        })
    })
} 

exports.view = function(req, res){
    Webcast.findById(req.params.webcast_id, function(err, webcast){
        if(err){
            res.json(err);
        }
        res.json({
            message: "sucess",
            data: webcast
        })
    })
} 