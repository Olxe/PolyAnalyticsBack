const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/PolyAnalyticsDb', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

    var tweet = require('./src/tweet.js');
    tweet.StartTweetStream();

}).catch(err => {
  console.log(err);
});