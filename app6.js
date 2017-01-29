var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var rp = require('request-promise');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var m;
app.post("/", function(req, resp) 
{

function getemodata(photo)
{
request(
{
    method: 'POST',
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '5998890bbdc74f8dbf77490639ba2604'
    },
    body: JSON.stringify({
        url: photo
    })},
    function (error, response, body) {
    
        console.log (JSON.parse(body));
        return (JSON.parse(body));

})}

console.log(getemodata("http://image.shutterstock.com/z/stock-photo-portrait-of-a-smiling-man-64313755.jpg"));

});

app.listen(8080);