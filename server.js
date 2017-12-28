const express = require('express');
const bodyParser = require('body-parser');

// LOAD SERVER FUNCTIONALITY //
var router = express.Router();
var app = express();

// IMPORT ALL DATABASE SCHEMAS //
var character = require('./schemas/character.js');
var anime = require('./schemas/anime.js');

// IMPORT HELPER TOOLS //
var schemaBuilder = require('./tools/schemaBuilder.js');
var dataChecker = require('./tools/dataChecker.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

router.get("/", function(req, res) { res.send("Hello World"); });

// API ROUTES //
router.route("/character")
    .get(function(req, res) { character.find({}, function(err, data) { dataChecker(res, err, data); }); })
    .post(function(req, res) { schemaBuilder("character", req, res); });
    
router.route('/character/:DBid')
    .get(function(req, res) { character.findOne({'DBid': req.params.DBid}, function(err, data) { dataChecker(res, err, data); }); })

    .put(function(req, res) {
        character.findOne({'DBid': req.params.DBid}, function(err, data) { 
            if (err || !data) { dataChecker(res, err, data); }
            else {
                if(req.body.DBid !== undefined) { data.DBid = req.body.DBid; }
                if(req.body.name.first !== undefined) { data.name.first = req.body.name.first; }
                if(req.body.name.surname !== undefined) { data.name.surname = req.body.name.surname; }
                if(req.body.name.ja !== undefined) { data.name.ja = req.body.name.ja; }
                if(req.body.gender !== undefined) { data.gender = req.body.gender; }
                if(req.body.age !== undefined) { data.age = req.body.age; }
                if(req.body.height !== undefined) { data.height = req.body.height; }
                if(req.body.weight !== undefined) { data.weight = req.body.weight; }
                if(req.body.voice.ja !== undefined) { data.voice.ja = req.body.voice.ja; }
                if(req.body.voice.en !== undefined) { data.voice.en = req.body.voice.en; }
                if(req.body.description !== undefined) { data.description = req.body.description; }
                if(req.body.episodes !== undefined) { data.episodes = req.body.episodes; }
                if(req.body.manga_chapters !== undefined) { data.manga_chapters = req.body.manga_chapters; }
                if(req.body.novel_chapters !== undefined) { data.novel_chapters = req.body.novel_chapters; }
                data.save(function(err){
                    if(err) { return dataChecker(res, err, "Error in updating data"); } 
                    else { return res.send("Data is updated for " + req.params.DBid); }
                })
            }
        });
    })
    
    .delete(function(req, res) {
        character.findOne(req.params.DBid, function(err, data) {
            if (res.statusCode !== 200) { return res.send('Error ' + res.statusCode + ": " + data); }
            else if (data === null) { return res.send('Error 404: Data not found'); }
            else {
                character.remove({'DBid' : req.params.DBid}, function(err){
                    if(err) { return res.send("Error in deleting data " + err); } 
                    else { res.send("Data tied with the id of " + req.params.DBid + " has been removed."); }
                });
            }
        });
    });

router.route("/media/anime")
    .get(function(req, res) { anime.find({}, function(err, data) { dataChecker(res, err, data); }); })
    .post(function(req, res) { schemaBuilder("anime", req, res) });

app.use('/', router);

app.listen(3000); 
console.log("Listening on PORT 3000");