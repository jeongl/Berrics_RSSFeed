var express = require('express');
var app = express();
var feed = require("feed-read");

app.get('/getFeed', function (req, res) {
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
    res.send(articles );
  });
});




var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});