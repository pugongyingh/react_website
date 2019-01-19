var fs = require("fs");

exports.handler = function(event, context, callback) {
  try {
  fs.readFile("/tmp/test.txt", function(err, body) {
    callback(null, {
      body: JSON.stringify(body),
      statusCode: 200,
    });
  });
  } catch (err) {
    callback(null, {
      body: err,
      statusCode: 200,
    });
  }
}
