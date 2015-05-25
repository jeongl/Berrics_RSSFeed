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
})

//document.querySelectorAll('[data-video-configuration]')[0].getAttribute('data-video-configuration')

app.get('/getFeed', function (req, res) {
  console.log('enters this route: ');
  feed("http://theberrics.com/video/rss/", function(err, articles) {
    if (err) throw err;
    // Each article has the following properties:
    // 
    //   * "title"     - The article title (String).
    //   * "author"    - The author's name (String).
    //   * "link"      - The original article link (String).
    //   * "content"   - The HTML content of the article (String).
    //   * "published" - The date that the article was published (Date).
    //   * "feed"      - {name, source, link}
    // 
    res.jsonp(articles );
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