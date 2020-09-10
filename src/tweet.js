var TweetSchema = require('../schema/tweetSchema.js');

var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);

module.exports = {
  StartTweetStream: async function() {
    console.log('Twitter streaming is starting');

    T.get('followers/ids', { screen_name: 'MichaelBugnone' },  function (err, data, response) {
      for (var i = 0; i < data['ids'].length; i++) {
        // console.log(data['ids'][i]);

        if(data.length > 0) {
          var id = data[0]['ids']
          console.log(id);
        }
        // getFollowerLookup(data['ids'][i]);
      }
    });

    // var stream = T.stream('statuses/sample')

    // stream.on('tweet', function (tweet) {
    //   console.log(tweet);
    //   // onTweetReceived(tweet);
    // });
  }
}

async function getFollowerLookup(follower) {
    T.get('users/lookup', { user_id: follower },  function (err, data, response) {
      console.log(data);
      console.log(data['screen_name']);
    });
}

async function onTweetReceived(tweet) {
  try {
    var user_id = tweet['user_id'];
    var lang = tweet['lang'];
    var text = tweet['text'];
    var hashtags = [];

    for (var i = 0; i < tweet['entities']['hashtags'].length; i++) {
      hashtags[i] = tweet['entities']['hashtags'][i]['text'];
    }

    if(lang === 'fr' && hashtags.length > 0) {

      var tweetSchema = new TweetSchema({
        hashtag : hashtags,
        text : text,
        lang : lang
      });

      tweetSchema.save();

      console.log('\x1b[31m', 'Lang: ' + lang + ' User id: ' + user_id);
      console.log('\x1b[32m', 'Hashtags: ' + hashtags);
      console.log('\x1b[34m', 'Text: ' + text + '\x1b[0m\n');
    }

    // console.log(tweet);
  }
  catch (error) {
    console.log(error);
  }
}