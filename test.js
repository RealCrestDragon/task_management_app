const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'Tqbfjotld@1610',
  host: '172.25.192.1',
  port: 5432,
  database: 'postgres',
});

client
  .connect()
  .then(() => {
    console.log('connected');
    return client.end();
  })
  .catch(console.error);
