var express = require('express');
var request = require("request");
var app = express();
var html;

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
        
        
        for (a=0;a<queries.length;a++)
        {
            var webaddress1=queries[a];
            request({
                  uri: 'http://www.'+webaddress1.replace('http://','').replace('www.',''),
                  name:webaddress1,
                  }, function(error, response, body) {
                   parse(body,this.name);
                   finalwrite(queries.length,res);
                 
              });
        }
       
    
  }
  else
  res.send('No Address was provided');
    
    
})

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

function parse(body,webaddress1)
{
  try
  {
    
 html+='\n\t\t<li>'+webaddress1+' - "'+body.match(/<title[^>]*>([^<]+)<\/title>/)[1]+'"</li>';
  }
  catch(exception)
  {

   html+='\n\t\t<li>'+webaddress1+' - '+'NO RESPONSE '+'</li>';
  }
  
}



function finalwrite(length,response)
{
  
 if ((html.match(/<li>/g) || []).length==length)
 {
html+='\n\t</ul>\n</body>\n</html>';
console.log(html);
response.send(html);
 }
}
