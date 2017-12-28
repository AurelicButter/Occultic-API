// IMPORT ALL SCHEMAS //
var character = require('../schemas/character.js');
var anime = require('../schemas/anime.js');
var episode = require('../schemas/episode.js');
var book = require('../schemas/book.js');
var staff = require('../schemas/staff.js');

// IMPORT TOOL //
var dataChecker = require('./dataChecker.js');

module.exports = function (type, req, res) {
    if (type === "character") {
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
    } else if (type === "anime") {
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
    } else if (type === "episode") {
        var db = new episode();
            db.DBid = req.body.DBid,
            db.episode_number = req.body.episode_number,
            db.aired_date = req.body.aired_date,
            db.title.en = req.body.title.en,
            db.title.ja = req.body.title.ja,
            db.description = req.body.description,
            db.characters = req.body.characters
    } else if (type === "staff") {
        var db = new staff();
            db.DBid = req.body.DBid,
            db.name.first = req.body.name.first,
            db.name.surname = req.body.name.surname,
            db.name.ja = req.body.name.ja,
            db.gender = req.body.gender,
            db.position = req.body.position,
            db.description = req.boy.description
    } else if (type === "manga" || type === "novel") {
        var db = new book();
            db.DBid = req.body.DBid,
            db.publish = req.body.publish,
            db.title.en = req.body.title.en,
            db.title.ja = req.body.title.ja,
            db.description = req.body.description,
            db.chapters = req.body.chapters,
            db.volumes = req.body.volumes,
            db.genres = req.body.genres,
            db.rating = req.body.rating,
            db.author = req.body.author
    }

    if (!db) { return dataChecker(res, err, "The schema builder is unable to find the schema for adding the data."); }
    db.save(function(err) { dataChecker(res, err, "Data added successfully"); });
};