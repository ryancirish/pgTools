//see docs for pooling but this is for the client connection with node-postgress (npm install --save pg)
//run in node for testing or deliver in a express or another runtime as a file import

const { Client } = require('pg');
const connectionString = 'CONNECTION_STRING'; //environment variable or a postgres:// string, see SO or docs for adv details
const client = new Client({
  connectionString: connectionString,
});
client.connect();


/* 

SELECT *
FROM info_schema.columns
WHERE table_schema = 'your_schema'
AND table_name   = 'your_table'

*/

const query = {
  // give the query a unique name
  name: 'fetch-user',
  text: 'SELECT * FROM SCHEMA_NAME.TABLENAME' //the tables from my use case were separated 
};


var pkg = '';
client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    //console.log(res); gets the entire object
    pkg = res.rows[0];
    console.log(res.rows[0]); // gets the first row, saves time for sure
  }
});

return pkg;
