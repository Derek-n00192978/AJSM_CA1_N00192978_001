
const MongoClient = require('mongodb').MongoClient;

const username =encodeURIComponent('admin');
const password =encodeURIComponent('root');
const database =encodeURIComponent('AJS_CA1_N00192978_001');
const host =encodeURIComponent('localhost');
const port =encodeURIComponent('27017');

const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;

const seed = async () => {
    //create ne MongoClient
    const client = new MongoClient(url);

    try{
        //Connect to DB
    await client.connect();
    console.log('Connected successfully to sever');

    //open the example_db database
    const db = client.db(database);

    //get a list of the collections in the database
    const collections = await db.listCollections({}, { nameOnly: true}).toArray();
    console.log(collections);

    collections.forEach( async (collection) => {
        await db.dropCollection(collection.name);
    });

    const auto_partsCollection = await db.createCollection("auto_parts", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["email", "password"],
                properties: {
                    email: {
                        bsonType: "string",
                        description: "Email must be a string and is required"
                    },
                    password: {
                        bsonType: "string",
                        description: "Password must be a string and is required"
                    }
                }
            }
        }
    })

    const auto_parts = [
        {name: "Auto Care Limited", location: "Dublin", phone:"01-2605530"},
        {name: "Auto Care Bray", location: "Bray", phone:"01-2762961"},
        {name: "Auto Care Rathnew", location: "Wicklow", phone:"0404-65080"}
    ];

    let result = await auto_partsCollection.insertMany(auto_parts);
    //console.log(result);

    //Read Auto_parts
    const myAuto_parts = await auto_partsCollection.find().toArray();
    console.log(myAuto_parts);
    //close the client
     await client.close();
     console.log("database connection closed")

    }
    catch(error){
        console.log(error);
    }
    
}; 

//Run connect
seed()
.then(() => console.log("Database seeding completed"))
.catch(e => console.log(e));
//--npm run seed-- in terminal

