var fs = require("fs");

exports.handler = function(event, context, callback) {

  fs.writeFile("/tmp/test.txt", "testing", function (err) {
    if (err) {
      context.fail("writeFile failed: " + err);
    } else {
      context.succeed("writeFile succeeded");
    }
  });

  callback(null, {
    statusCode: 200,
    body: fs.readFile("/tmp/test.txt"),
  });
}
