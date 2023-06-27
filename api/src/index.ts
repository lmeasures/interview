import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';


// docker networks not functioning correctly- had to use docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongodb
// to determine the networked ip of the DB container and effectively brute-force a connection from the DB.
const connectionString = 'mongodb://interview-mongo-1.interview_default:27017/UserData';
// const connectionString = 'mongodb://172.24.0.2:27017/UserData';

const app = express();
app.use(express.json());
 
const PORT = 3001;

const userSearchHandler = async (req: Request, res: Response) => {
    try{
        const client = await MongoClient.connect(connectionString);
        const db = client.db();
        const usersCollection = db.collection('users');

        const searchString = req.query.search as string;

        const regex = new RegExp(searchString, "i");
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
        res.status(500).send();
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

        res.status(201).send();
    }
    catch(e){
        console.error("Error writing user to database: ", e)
        res.status(500).send();
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
    console.log("Server Listening on PORT: ", PORT);
})
