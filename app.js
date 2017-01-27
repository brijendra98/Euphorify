var express = require("express");
var myParser = require("body-parser");
var request1 = require('request');
var app = express();
var fs = require('fs');

var len;
var phid =[];
var emoray =[];
app.use(myParser.urlencoded({extended : true}));
app.post("/", function(request, response) {

    var arr = JSON.parse(request.body["file"])["photos"]["data"];
    len = phid.length;
    for(i=0;i<arr.length;i++){


            ele = ((JSON.parse(request.body["file"])["photos"]["data"][i]["images"][0]["source"]));
            phid.push(ele);


            }
        

console.log(phid);
fs.writeFileSync("../data.txt",phid);

}

)   




app.listen(8080);
