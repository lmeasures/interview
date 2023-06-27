import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const connectionString = 'mongodb://localhost:27017/mydb';

const app = express();
app.use(express.json());

const PORT = 3001;

const userSearchHandler = async (req: Request, res: Response) => {
    try{
        const client = await MongoClient.connect(connectionString);
        const db = client.db();
        const usersCollection = db.collection('users');

        const str = req.params.search

        const regex = new RegExp(req.params.search, "i");

        const dbQuery = { name: regex };
        const results = await usersCollection
                                .find(dbQuery)
                                .toArray();

        client.close();
        
        console.log("Results, get!: ");
        results.forEach(user => {
            console.log(user);
        });

        res.status(200).send(results);
    }   
    catch (e) {
        console.error("Error searching for users", e);
        res.status(500);
    }
}

const postUserHandler = async (req: Request, res: Response) => {

    // Validate requestBody

    try { 
        const client = await MongoClient.connect(connectionString);
        const db = client.db();
        const usersCollection = db.collection('users');

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
        }

        const response = await usersCollection.insertOne(newUser);
        console.log('Entry Added, UserId: ', response.insertedId);

        client.close();

        res.status(204);
    }
    catch(e){
        console.error("Error writing user to database: ", e)
        res.status(500);
    }
}


app.get("/userSearch", userSearchHandler);
app.post("/user", postUserHandler);

app.get("/", (req: Request, res: Response) => {
    console.log("Hello World!");
    res.status(204).send();
});

app.get("/status", (req, res) => {
    const status = {
        "Status": "Running"
    };
    res.send(status);
})

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
})
