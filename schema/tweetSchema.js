const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweet = new Schema({
    hashtag : [String],
    text : String,
    lang : String,
    createdat: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tweets', tweet);