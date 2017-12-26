const express = require('express');

module.exports = function(err, code, data) {
    if (err) { console.log(err); }
    return 'Error ' + code + ": " + data;
};