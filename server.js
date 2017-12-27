const express = require('express');
const bodyParser = require('body-parser');

// LOAD SERVER FUNCTIONALITY //
var router = express.Router();
var app = express();
var errorLog = require('./errors.js');

// IMPORT ALL DATABASE SCHEMAS //
var character = require('./schemas/character.js');
var anime = require('./schemas/anime.js');
var episode = require('./schemas/episode.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

router.get("/", function(req,res) { res.send("Hello World"); });

// API ROUTES //
router.route("/character")
    .get(function(req, res) {
        character.find({}, function(err, data){
            if (res.statusCode !== 200) { return res.send(errorLog(err, res.statusCode, "Error in fetching data")); }
            else if (data === null) { return res.send(errorLog(err, 404, "Data not found")); }
            else { res.json(data); }
        });
    })

    .post(function(req, res) {
        var db = new character();
        db.DBid = req.body.DBid,
        db.name.first = req.body.name.first,  
        db.name.surname = req.body.name.surname,
        db.name.ja = req.body.name.ja,
        db.gender = req.body.gender,
        db.age = req.body.age,
        db.height = req.body.height,
        db.weight = req.body.weight,
        db.voice.ja = req.body.voice.ja,
        db.voice.en = req.body.voice.en,
        db.description = req.body.description,
        db.episodes = req.body.episodes,
        db.manga_chapters = req.body.manga_chapters,
        db.novel_chapters = req.body.novel_chapters

        db.save(function(err) {
            if (res.statusCode !== 200) { return res.send(errorLog(err, res.statusCode, "Error in adding data")); }
            else { return res.send("Data added successfully!"); }
        });
    });
    
router.route('/character/:DBid')
    .get(function(req, res) {
        character.findOne({'DBid': req.params.DBid}, function(err, data) {
            if (res.statusCode !== 200) { return res.send(errorLog(err, res.statusCode, "Error in fetching data")); }
            else if (data === null) { return res.send(errorLog(err, 404, "Data not found")); }
            else { res.json(data); }
        });
    })

    .put(function(req, res) {
        character.findOne({'DBid': req.params.DBid}, function(err,data){
            if(err) { return res.send(errorLog(err, res.statusCode, "Error in fetching data")); } 
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
                    if(err) { return res.json({"error" : true,"message" : "Error updating data"}); } 
                    else { return res.send("Data is updated for " + req.params.DBid); }
                })
            }
        });
    })
    
    .delete(function(req, res) {
        character.findOne(req.params.DBid, function(err, data) {
            if (res.statusCode !== 200) { return res.send(errorLog(err, res.statusCode, "Error in fetching data")); }
            else if (data === null) { return res.send(errorLog(err, 404, "Data not found")); }
            else {
                character.remove({'DBid' : req.params.DBid}, function(err){
                    if(err) { return res.send(errorLog(err, res.statusCode, "Error in deleting data")); } 
                    else { res.send("Data tied with the id of " + req.params.DBid + " has been removed."); }
                });
            }
        });
    });

router.route("/media")
    .get(function(req, res) {
        anime.find({}, function(err, data){
            if (res.statusCode !== 200) { return res.send(errorLog(err, res.statusCode, "Error in fetching data")); }
            else if (data === null) { return res.send(errorLog(err, 404, "Data not found")); }
            else { res.json(data); }
        });
    })

    .post(function(req, res) {
        var db = new anime();
        db.DBid = req.body.DBid,
        db.dates.start = req.body.dates.start,
        db.dates.end = req.body.dates.end,
        db.title.en = req.body.title.en,
        db.title.ja = req.body.title.ja,
        db.description = req.body.description,
        db.episode_count = req.body.episode_count,
        db.producers = req.body.producers,
        db.licensor = req.body.licensor,
        db.studio = req.body.studio,
        db.source = req.body.source,
        db.genre = req.body.genre,
        db.rating = req.body.rating,
        db.episode_duration = req.body.episode_duration,
        db.music.opening = req.body.music.opening,
        db.music.ending = req.body.music.ending,
        db.staff = req.body.staff

        db.save(function(err) {
            if (res.statusCode !== 200) { return res.send(errorLog(err, res.statusCode, "Error in adding data")); }
            else { return res.send("Data added successfully!"); }
        });
    });

app.use('/', router);

app.listen(3000); 
console.log("Listening on PORT 3000");