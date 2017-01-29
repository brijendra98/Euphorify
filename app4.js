var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
var request = require('request');
var oxfordEmotion = require("node-oxford-emotion")('5998890bbdc74f8dbf77490639ba2604')
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


    function getemodata(photo)
    {
        oxfordEmotion.recognize("url", photo, function(cb) {
          function binaryRead(cb) {
              var bitmap = fs.readFileSync(file);
              return new Buffer(bitmap.toString('binary'),'binary');
          }
      });
    }


    console.log(getemodata("http://www.catutopia.com.au/wp-content/uploads/2015/08/HappyCat.jpg"));



});


app.listen(8080);