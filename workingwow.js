var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
const readJsonSync = require('read-json-sync');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var photolist =[];
var emolist =[];
var finallist=[];

app.post("/", function(req, resp) 
{

var len = (JSON.parse(req.body["file"]))["photos"]["data"].length;

function getphoto(len,callback)
{
for(i=0;i<len;i++)
{photolist.push((JSON.parse(req.body["file"]))["photos"]["data"][i]["images"][0]["source"]);}
return callback(photolist);
}


function getemodata(photo,callback)
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
    if (!error && response.statusCode == 200) 
    {
        return callback([photo,JSON.parse(body)]);
    }
})}



function combiner()
{
    getphoto(len, function (photo_list){
    for(var item in photo_list){
    {
        getemodata(photolist[item], function(response){
        emolist.push(response);
    })
}
}
})}


function printer (x){
    console.log(emolist);

}
printer(combiner());

});


app.listen(8080);