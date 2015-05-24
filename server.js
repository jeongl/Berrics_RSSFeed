var express = require('express');
var app = express();
var feed = require("feed-read");

app.set('trust proxy', true);

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

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});