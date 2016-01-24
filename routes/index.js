var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://localhost/monogotest');

fs.readdirSync('/root/Projects/nodewithmongoose/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require('/root/Projects/nodewithmongoose/models/' + filename);
});

router.get('/',function(req,res){
	res.render('index',{
		title:"My App with Mongoose",
		age : 20
	});
});
router.get('/users',function(req,res){
	mongoose.model('users').find(function(err,data){
		console.log('showing data');
		res.send(data);		
	})
});
router.get('/users/:age',function(req,res){
	var age = req.params.age;

	mongoose.model('users').find({"age":age},function(err,data){
		console.log('showing data');
		res.send(data);		
	})
});

router.get('/posts',function(req,res){
	mongoose.model('posts').find(function(err,data){
		res.send(data);
	});
});

router.get('/posts/:id',function(req,res){
	mongoose.model('posts').find({user:req.params.id},{_id:0,__v:0},function(err,posts){
		mongoose.model('posts').populate(posts,{path:'user'},function(err,posts){
			res.send(posts);
		});
	});
});

router.post('/users',function(req,res){
	var users = mongoose.model('users');
	new users({ 
		name : req.body.name,
		age: req.body.age
	}).save(function(err,data){
		console.log('data');
		if(err) console.log(err);
		else
			res.send('successfully inserted');
	});
});

router.post('/posts',function(req,res){
	var posts = mongoose.model('posts');
	new posts({
		contents : req.body.contents,
		user : req.body.id
	}).save(function(err,data){
		if (err) console.log(err);
		else
			res.send('successfully inserted');
	})
});
module.exports = router;
