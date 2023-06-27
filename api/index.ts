import {express} from 'express';
import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://localhost:27017/mydb';

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
})

const userSearchHandler = (req, res) => {
    
}

const postUserHandler = async (req, res) => {

    // Validate requestBody

    try { 
        const client = await MongoClient.connect(connectionString);
        const db = client.db();
        const userCollection = db.collection('users');

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
        }

        const response = await userCollection.insertOne(newUser);
        console.log('Entry Added, UserId: ', response.insertedId);

        client.close();
    }
    catch(e){
        console.error("Error writing user to database: ", e)
    }
}


app.get("/userSearch", userSearchHandler);
app.post("/user", postUserHandler);


app.get("/status", (req, res) => {
    const status = {
        "Status": "Running"
    };
    res.status(204).send(status);
})
