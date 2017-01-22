1. //Import the necessary libraries/declare the necessary objects
2. var express = require("express");
3. var myParser = require("body-parser");
4. var app = express();
5. 
6.   app.use(myParser.urlencoded({extended : true}));
7.   app.post("/yourpath", function(request, response) {
8.       console.log(request.body); //This prints the JSON document received (if it is a JSON document)
9. });
10. 
11. //Start the server and make it listen for connections on port 8080
12. 
13. app.listen(8080);