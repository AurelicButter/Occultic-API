module.exports = function(res, err, data) {
    if (data === null) { return 'Error 404: Data not found!'; }
    if (res.statusCode !== 200) {
        if (err) { 
            console.log(err); 
            return res.send('Error ' + res.statusCode + ": " + data);
        }
    }
    else { return res.send(data); }
};