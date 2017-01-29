var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
const readJsonSync = require('read-json-sync');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var photolist =[];
var emolist =[];
var comblist ={}

app.post("/", function(req, resp) 
{

var len = (JSON.parse(req.body["file"]))["photos"]["data"].length;

function getphoto(len)
{
for(i=0;i<len;i++)
{photolist.push((JSON.parse(req.body["file"]))["photos"]["data"][i]["images"][0]["source"]);}
return photolist;
}


function getemodata(photolist)
{
for(k=0;k<len;k++)
{
request({
    method: 'POST',
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '5998890bbdc74f8dbf77490639ba2604'
    },
    body: JSON.stringify({
        url: photolist[k]
    })
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        emolist.push(photolist[k],JSON.parse(body));
    }
})}
return emolist;}


console.log(getemodata(getphoto(len)));
});


app.listen(8080);