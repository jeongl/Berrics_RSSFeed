var express = require('express');
var app = express();
var feed = require("feed-read");
var Req = require('superagent');
var $ = require('cheerio');

app.set('trust proxy', true);

app.use(express.static('./'));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next() 
});

app.get('/getFeed', (req, res) => {
  Req.get('http://theberrics.com').end(function(err, response){
    res.send(response)
  });

});

app.get('/getVideoLink', function(req, res){
  Req.get(req.query.videoPage).end(function(err, response){
    //This link is for the 1080p verision
    try {
      var linkData = link = JSON.parse($(response.text).
        find('[data-video-configuration]').attr('data-video-configuration'))
      var link = linkData.sources.file || linkData.sources[2].file || linkData.sources[1].file || linkData.sources[0].file
      res.send(link );      
    } catch (e){res.send('error')}
  })

});

var server = app.listen(8052, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});