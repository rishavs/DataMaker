var request = require('request');
request('http://www.google.com', function (error, response, body) {
	console.log('error:', error); // Print the error if one occurred
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	console.log('body:', body); // Print the HTML for the Google homepage.
});

var rest = require('./restler');

rest.post('http://user:pass@service.com/action', {
  	data: { id: 334 },
	})
	.on('complete', function(data, response) {
  if (response.statusCode == 201) {
    // you can get at the raw response like this...
  }
});