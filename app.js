var express = require("express");
var myParser = require("body-parser");
var request1 = require('request');
var app = express();
var fs = require('fs');
app.use(myParser.json({limit: '5mb'}));
app.use(myParser.urlencoded({limit: '5mb'}));

var len;
var phid =[];
var emoray =[];
app.use(myParser.urlencoded({extended : true}));
app.post("/", function(request, response) {

    var arr = JSON.parse(request.body["file"])["photos"]["data"];
    len = phid.length;
    for(i=0;i<arr.length;i++){

        var arr1 = JSON.parse(request.body["file"])["photos"]["data"][i]["images"];
        for(j=0;j<arr1.length;j++){
            ele = ((JSON.parse(request.body["file"])["photos"]["data"][i]["images"][j]["source"]));
            phid.push(ele);


            request1({
                method: 'POST',
                url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': '5998890bbdc74f8dbf77490639ba2604'
                },

                body: JSON.stringify({
                    url: ele
                })
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var object = JSON.parse(body);
			if(typeof object[0] !== "undefined")
                    {emoray.push(object[0]);}

                }})}
        }

var jsondata = JSON.stringify(emoray);
fs.writeFileSync("../data.txt",jsondata);

}

)   




app.listen(8080);