/* mySeedScript.js */

// require the necessary libraries
const faker = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = 'mongodb+srv://admin:root@cluster0.sd2kb8x.mongodb.net/AJS_CA1_N00192978_001?retryWrites=true&w=majority'
    //const uri = 'mongodb://admin:root@localhost:$27017/AJS_CA1_N00192978_001?authSource=admin';

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("AJS_CA1_N00192978_001").collection("auto_parts");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 5000; i++) {
            const name = faker.company.name();
            const location = faker.address.city();
            const phone = faker.phone.number();
           
            let newDay = {
                timestamp_day: faker.date.past(),
                
                events: [],
            };

            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: faker.date.past(),
                    weight: randomIntFromInterval(14,16),
                }
                newDay.events.push(newEvent);
            }
            timeSeriesData.push(newDay);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();