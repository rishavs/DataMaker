var request = require('request');

posts = require('./posts.json');
users = require('./users.json');

list = posts

var total_count = 0
var pass_count = 0
var fail_count = 0

var st = new Date();

// Turn the list into Promises that resolve once the request returns.
var promises = list.map(function (item) {
    return new Promise(function (resolve, reject) {
        //Lets configure and request
        request({
            url: 'http://localhost:4000/api/posts',
            method: 'POST',
            json: { 'post' : item}
        }, function(error, response, body) {
            total_count = total_count + 1

            if(error) {
                console.log(error);
                fail_count = fail_count + 1
            } else {
                // console.log(response.statusCode, body);
                var dt = new Date();
                // console.log('Successfully posted in: ' + (dt - st) + " milliseconds."  );
                pass_count = pass_count + 1
            }
            resolve();
        }); // End of request
    }); // End of Promise
}); // End of list.map

Promise.all(promises) // When all these promsies have resolved() call the .then
    .then(function () {
        console.log('=========================================');
        console.log('Total : ' + total_count);
        console.log('Pass : ' + pass_count);
        console.log('Fail : ' + fail_count);
        console.log('=========================================');
        var et = new Date();
		console.log("Total Time Taken 	= " + (et - st)/1000 + " seconds.")
		console.log("Average Time Taken = " + (et - st)/total_count + " milliseconds.")
    });