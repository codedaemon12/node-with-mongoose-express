var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

fs.readdirSync('/root/Projects/nodewithmongoose/models').forEach(function(filename){
	if(~filename.indexOf('.js')) require('/root/Projects/nodewithmongoose/models/'+filename);
})

module.exports = router;
