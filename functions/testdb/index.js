var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host : 'testdb.cmzabivlkufu.us-east-2.rds.amazonaws.com',
    user : 'derek',
    password : process.env.DB_PASSWORD,
    database : 'testdb',
 },
});
