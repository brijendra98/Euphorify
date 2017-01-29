var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://23.92.21.203:8081/datastore';
const readJsonSync = require('read-json-sync');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var photolist =[];
var emolist =[];
var comblist ={};
var k =[];

app.post("/", function(req, resp) 
{

    var len = (JSON.parse(req.body["file"]))["photos"]["data"].length;

    function getphoto(len)
    {
        for(i=0;i<len;i++)
            {photolist.push((JSON.parse(req.body["file"]))["photos"]["data"][i]["images"][0]["source"]);}
        return photolist;
    }

getphoto(len);
});

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db.createCollection("pic");
  pic.insert(photolist);
  db.getCollectionNames();
  db.close();
});


app.listen(8080);