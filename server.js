//Express Setup
const express = require('express');
const path = require('path');
const app = express();

//react server setup
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('src/Screens'));
// }
// app.get('*', (request, response) => {
// 	response.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//use this to parse the body of posts
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//use this to hash passwords on create account/compare on sign in
//TODO: uncomment this and actually import it
//var bcrypt = require('bcryptjs');

//port that the server is running on
//const port = 'https://facesdev.herokuapp.com';//process.env.PORT || 5000;
const port = process.env.PORT || 5000;

//Postgres Setup
const pg = require('pg');
var client = new pg.Client({
    user: "ylsepbuzgrmdov",
    password: "38c17d21a475b11d2220db5186f58f6bf4aa917bb3a06fed69172b70553dc32a",
    database: "d3bu2ichvtb3a0",
    port: 5432,
    host: "ec2-174-129-225-9.compute-1.amazonaws.com",
    ssl: true
}); 
client.connect();

//authentication token stuff setup
//TODO: uncomment this and actually import it
var jwtMiddleware = require('express-jwt');
// We pass a secret token into the NodeJS process via an environment variable.
// We will use this token to sign cookies and JWTs
var SECRET_TOKEN = process.env.SECRET_TOKEN || 'supersecrettoken';

var JWT = require('jsonwebtoken');


//make the api listen at this port
app.listen(port, () => console.log(`Listening at port ${port}`));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Expose-Headers', '*');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/noauth/signin', (req, res) => {
  //TODO: change this to first get id by username, then compare hashed passwords.
  var q = 'select id from "User" where username = \'' + req.body.username + '\' and password = \'' + req.body.password + '\'';
  console.log(q);
  var query = client.query(q).then(result => {
  
    var userId;
    console.log(result.rows);
    //user signed in successfully
    if(result.rowCount){
      userId = result.rows[0].id;

      // https://github.com/auth0/node-jsonwebtoken
      // Using SECRET_TOKEN, create a token string that contains the user's _id from the database.
      var token = JWT.sign({ 
        _id: userId
      }, SECRET_TOKEN);
      console.log(token);
      res.send({userId: userId, token: token});
    }
    else res.sendStatus(404);
  });               
});

app.post('/noauth/createaccount', (req, res) => {
  console.log(req.body);
  var q = 'INSERT INTO public."User"( ' +
    'username, occupation, profilepicturesrc, profilebackgroundsrc, date, isactive, password, websiteurl, permissiontypeid, firstname, lastname) '+
    'VALUES (\'' + req.body.username + '\', \'' + req.body.occupation + '\', \'https://image.freepik.com/free-vector/abstract-background-with-dark-square-pattern_1048-1391.jpg\', ' +
    '\'https://image.freepik.com/free-vector/abstract-background-with-dark-square-pattern_1048-1391.jpg\', current_timestamp, \'1\', \'' + req.body.password + '\', \'' + req.body.websiteUrl + 
    '\', 2, \'' + req.body.firstName + '\', \'' + req.body.lastName + '\');' ;
  console.log(q);
    var query = client.query(q)
                    .then(result => {
                      client.query('select max(id) from "User"').then(
                        result => {
                          var token = JWT.sign({ 
                            _id: result.rows[0]
                          }, SECRET_TOKEN);
                          console.log(token);
                          res.send({userId: result.rows[0].max, token: token});
                        });
                    });               
});

//global controller gets called first on any call that requires auth
// app.all('/api/*',function(req,res,next){
//     res.header('X-XSS-Protection' , 0 );
//     console.log(req.headers);
//     if(req.headers.authorization){
//       JWT.verify(req.body.token, SECRET_TOKEN, function(err, token) {
//         if(err){
//           console.log(err)
//           res.send(err);
//         }
//         else{
//           console.log('authenticated, sending data');
//           next(); // http://expressjs.com/guide.html#passing-route control
//         }
//       });
//     }
//     else {
//       console.log('not authenticated')
//       res.sendStatus(401);
//     }
// });

//gets the info to be displayed on profile page
app.get('/api/getUserById', (req, res) => {
  var query = client.query('select * from fngetuserinfo(' + req.query.id + ')').then(result => {
    res.send(result);
  });
});

//gets the info to be displayed on single feed page
app.get('/api/getfeedbyid', (req, res) => {
  var query = client.query('select * from fngetfeedinfo(' + req.query.id + ')')
                    .then(result => {
                      res.send(result);
                    });
});

//get posts based on userid.  displayed on profile page
app.get('/api/getPostsForUser', (req, res) => {
  var query = client.query('select * from fngetuserposts(' + req.query.id + ')')
                    .then(result => {
                      res.send(result);
                    });
});

//gets post based on feedid.  displayed on singlefeedpage
app.post('/api/getpostsforfeed', (req, res) => {
    var q = 'select * from fngetpostsforfeed(' + req.body.userId + ', '+ req.body.feedId + ')';
    var query = client.query(q)
                            .then(result => {
                              res.send(result);
                            });

});

//gets the info to be displayed on profile page
app.get('/api/getCommentsForPost', (req, res) => {
  var query = client.query('select * from fngetcommentsforpost(' + req.query.id + ')')
                    .then(result => {
                      console.log(result);
                      res.send(result);
                    });
});

  //gets the list of posts for the user based on passed Id
app.get('/api/getUserIcon', (req, res) => {
  var query = client.query('select * from fnGetUserIcon(' + req.query.id + ')')
                    .then(result => {
                      res.send(result);
                    });
  });

    //gets the list of posts for the user based on passed Id
app.get('/api/getfeedsfordropdown', (req, res) => {
  var query = client.query('select id, title from "Feed" where isprivate = \'0\' and isactive = \'1\'')
                    .then(result => {
                      res.send(result);
                    });
  });

app.post('/api/getUserHomeFeed', (req, res) => {
 
        var query = client.query('select * from fngetuserhomefeed(' + req.body.userId + ')')
                    .then(result => {
                      res.send(result);
                    });

  });

 app.post('/api/createPost', (req, res) => {
  var q = 'INSERT INTO public."Post"('+
	        'title, description, imagesrc, url, feedid, userid, date, isactive)'+
	        'VALUES ( \'' + req.body.title + '\', \'' + req.body.description + '\', \'' + req.body.imagesrc + '\', \'' + req.body.url + '\', ' + req.body.feedid + ', ' + req.body.userId + ', current_timestamp, \'1\');';
  console.log(q);
          var query = client.query(q).then(result => {
  res.send(result);
  });               
});

 app.post('/api/createcomment', (req, res) => {
  var q = 'INSERT INTO public."Comment"(userid, postid, text, date, isactive)' +
	'VALUES (' + req.body.userid + ', ' + req.body.postid + ', \'' + req.body.text + '\', current_timestamp, \'1\');'
  console.log(q);
  var query = client.query(q).then(result => {
  res.send(result);
  });               
});

app.post('/api/searchfeedsandusers', (req, res) => {
 var q = 'select * from fnsearchfeedsandusers(\'' + req.body.name + '\', ' + req.body.userId + ')' ;
 var query = client.query(q).then(result => {
 console.log(result.rows);
 res.send(result);
 });               
});

app.post('/api/follow', (req, res) => {
 var q = 'INSERT INTO public."Follower"(' +
	'followerid, followeeid, followeefktypeid, date, isactive) ' +
	'VALUES (' + req.body.userId + ', ' + req.body.fkId + ', ' + req.body.fkTypeId + ', current_timestamp, \'1\');';
 console.log(q);
  var query = client.query(q).then(result => {
 res.send(result);
 });               
});

app.post('/api/unfollow', (req, res) => {
 var q = 'update "Follower" ' +
         'set isactive = \'0\' ' +
         'where followerid = ' + req.body.userId + ' and followeeid = ' +  req.body.fkId + ' and followeefktypeid = ' + req.body.fkTypeId + ' and isactive = \'1\'' ;
 var query = client.query(q).then(result => {
 res.send(result);
 });               
});

app.post('/api/likepost', (req, res) => {
  console.log(req.body);
 var q = 'INSERT INTO public."Like"(' +
         'userid, postid, date, isactive) ' + 
         'VALUES (' + req.body.userId + ', ' + req.body.postId + ', current_timestamp, \'1\');';
 var query = client.query(q).then(result => {
 res.send(result);
 });               
});

app.post('/api/unlikepost', (req, res) => {
  console.log(req.body);
  var q = 'update "Like" ' +
          'set isactive = \'0\' ' +
          'where userid = ' + req.body.userId + ' and postid = ' +  req.body.postId + ' and isactive = \'1\'' ;
  var query = client.query(q)
                    .then(result => {
                      res.send(result);
                    });               
});

app.get('/api/getfeedsforuser', (req, res) => {
  var query = client.query('select * from fngetfeedsforuser(' + req.query.id + ')')
                    .then(result => {
                      res.send(result);
                    });              
});

app.get('/api/getsuggested', (req, res) => {
  var query = client.query('select * from fngetsuggested(' + req.query.userid + ')')
                    .then(result => {
                      res.send(result.rows);
                    });              
});