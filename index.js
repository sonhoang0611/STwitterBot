// make requests to Twitter's APIs
var Twit = require('twit')
var T = new Twit({
    consumer_key:         '...',
    consumer_secret:      '...',
    access_token:         '...',
    access_token_secret:  '...',
})

//  id of users u want to retweet
var users = ["459275531", "815246", "15736190"];

// create and listen to a stream
var stream = T.stream('statuses/filter', {
    follow: users
});

stream.on('tweet', function (tweet) {
    if (users.indexOf(tweet.user.id_str) > -1) {
        console.log(tweet.user.name + ": " + tweet.text);
        T.post('statuses/retweet/:id', {
            id: tweet.id_str
        }, function (err, data, response) {
            console.log(data)
        })
    }
})
