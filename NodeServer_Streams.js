var express = require('express');
var request = require("request");
var async=require ("async");
var RSVP=require("RSVP");
var app = express();
var html;
var isComplete =false ;
var stram= require("stream");

//making server respond to given route
app.get('/I/want/title/', function (req, res) {
   var queries;
    try
    {
       queries=req.query.address.split(',');
    }
  catch (exception)
  { 
    queries=req.query.address;
  }
   
    if (queries!=null)

    {
   html="<html>\n<head></head>\n<body>\n\n\t<h1> Following are the titles of given websites: </h1>\n\n\t<ul>\n";
    
    
   
  

       new RSVP.Promise(function(fulfill, reject) {
            VisitPages(queries, res);
                 }).then(function()
                  {
                    response.log(isComplete);
                      while (!isComplete)
                        finalwrite(res, queries.length);

                  }

                 );

    }
    else
      res.send('No Address was provided');
    
    
});



app.get('*', function(req, res) {

if (req.path!='/favicon.ico')
{
  console.log('404 - Page Not Found');
  res.send('404 - Page Not Found');
}
});


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
  
  
})

function parse(body,webaddress1,callback)
{
  try
  {
    
    
 html+='\n\t\t<li>'+webaddress1+' - "'+body.match(/<title[^>]*>([^<]+)<\/title>/)[1]+'"</li>';
  }
  catch(exception)
  {

   html+='\n\t\t<li>'+webaddress1+' - '+'NO RESPONSE '+'</li>';
  }
  callback();
  
}



function finalwrite(response,length)
{
  
  if ((html.match(/<li>/g) || []).length==length)
 {
html+='\n\t</ul>\n</body>\n</html>';
isComplete=true;
console.log(html);
response.send(html);

 }
 
}


function VisitPages(queries, response)
{

  async.eachSeries(queries,
          
          function(queries, callback){
              
            request({
              uri: 'http://www.'+queries.replace('http://','').replace('www.',''),
              name:queries,
              }, function(error, response, body) {
              
               parse(body,this.name,callback);
             
          });
            // Call an asynchronous function, often a save() to DB
            
          },
          // 3rd param is the function to call when everything's done
          function(err){
           
           finalwrite(response, queries.length)
          }
        );

}