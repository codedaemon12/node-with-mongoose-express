var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name : String,
	age : Number
});

mongoose.model('users',userSchema);


