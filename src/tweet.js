var TweetSchema = require('../schema/tweetSchema.js');

module.exports = {
  StartTweetStream: async function() {
    console.log('Twitter streaming is starting');

    var Twit = require('twit');
    var config = require('./config.js');
    
    var T = new Twit(config);
    var stream = T.stream('statuses/sample')

    stream.on('tweet', function (tweet) {
      onTweetReceived(tweet);
    });
  }
}

async function onTweetReceived(tweet) {
  try {
    var lang = tweet['lang'];
    var text = tweet['text'];
    var hashtags = [];

    for (var i = 0; i < tweet['entities']['hashtags'].length; i++) {
      hashtags[i] = tweet['entities']['hashtags'][i]['text'];
    }

    if(hashtags.length > 0) {

      var tweetSchema = new TweetSchema({
        hashtag : hashtags,
        text : text,
        lang : lang
      });

      tweetSchema.save();

      console.log('\x1b[31m', 'Lang: ' + lang);
      console.log('\x1b[32m', 'Hashtags: ' + hashtags);
      console.log('\x1b[34m', 'Text: ' + text + '\x1b[0m\n');
    }

    // console.log(tweet);
  }
  catch (error) {
    console.log(error);
  }
}