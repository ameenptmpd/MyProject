var http=require('http');

http.createServer(function(req,res){
    res.write("ameentest");
    res.end();
}).listen(7000)