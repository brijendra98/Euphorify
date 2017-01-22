var express = require("express");
var myParser = require("body-parser");
var request = require('request');
var app = express();
 
app.use(myParser.urlencoded({extended : true}));
  app.post("/", function(request, response) {
      console.log(request.body["file"]);
 });


app.listen(8080);


request({
    method: 'POST',
    url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '55bd3d325c5e41b583bd97c0a56365f4'
    },
    body: JSON.stringify({
        url: 'https://pbs.twimg.com/media/CkIcZcuUYAE5WLD.jpg:large'
    })
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var object = JSON.parse(body);
        console.dir(object, {depth: null, colors: true})
    }
});