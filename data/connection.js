//TODO instalar packages mongo --> npm install mongodb
require('dotenv').config();
const mongoclient = require('mongodb').MongoClient;
const uri = process.env.MONGO_URI;
const client = new mongoclient(uri);

let instance = null;

//Singleton
async function getConnection() {
    if (instance == null) {
        try {
            instance = await client.connect();
        } catch (error) {
            console.log(error.message);
            throw new Error('Problemas al conectarse con mongoDB')
        }
    }
    return instance;
}

//Metodo que se exporta
module.exports = { getConnection };