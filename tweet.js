console.log('Twitter streaming is starting');

var Twit = require('twit');
module.export = {
    StartTweetStream: async function() {
        var config = require('./config.js');
        
        var T = new Twit(config);

        var stream = T.stream('statuses/sample')
         
        stream.on('tweet', function (tweet) {
          console.log('------------------------------');
          console.log(tweet);
          console.log('------------------------------');
        });
    }
}