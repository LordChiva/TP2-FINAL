//TODO instalar packages mongo --> npm install mongodb
const mongoclient = require('mongodb').MongoClient

//TODO prox clase utilizar variables de entorno 
const uri = "mongodb+srv://admin:admin123@cluster0.a4bro.mongodb.net/sample_tp2?retryWrites=true&w=majority"

const client = new mongoclient(uri);

let instance = null;

//singleton
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

module.exports = {getConnection};