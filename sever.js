const MongoClient = require('mongodb').MongoClient;

const username =encodeURIComponent('admin');
const password =encodeURIComponent('root');
const database =encodeURIComponent('AJS_CA1_N00192978_001');
const host =encodeURIComponent('localhost');
const port =encodeURIComponent('27017');

const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

const connect = async () => {
    //create ne MongoClient
    const client = new MongoClient(url);
    //Connect to DB
    await client.connect();
    console.log('Connected successfully to sever');

    //open the example_db database
    const db = client.db(database);

    //get a list of the collections in the database
    const collections = await db.listCollections({}, { nameOnly: true}).toArray();
    console.log(collections);


    //close the client
    client.close();
}; 

//Run connect
connect();
//--npm run dev-- in terminal

