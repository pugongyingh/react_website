//client.end();

exports.handler = (event, context, callback) => {
  var pg = require('pg');
    var connection = {
      host : 'arjuna.db.elephantsql.com',
      port: 5432,
      user : 'juicmaka',
      password : 'okUGxNKWk6CtRezIOHLBHxPbYiGMiQcS',
      database : 'juicmaka',
    };

  var client = new pg.Client(connection);
  client.connect();
  var query = client.query("SELECT ip_address FROM log_visits;");
  query.then(r => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(r.rows[0]),
    });
  });
  query.catch(r => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(r),
    });
  });
  //var connecProcess exited before completing requesttion = {
    //host : 'testdb.cmzabivlkufu.us-east-2.rds.amazonaws.com',
    //user : 'derek',
    //password : 'Aa89snj12',
    //database : 'testdb',
  //};

  //try {
    //var client = new pg.Client(connection);
    //client.connect();
    //var query = await client.query("SELECT id FROM users;");

    //query.then(r => console.log(r));
    //query.catch(r => console.log(r));
    //client.end();
    //console.log("xs")
  //}
  //catch (err) {
    //console.log("x", err)
  //}
}
