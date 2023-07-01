import cors from 'cors';
import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

interface UserModel {
    name: string,
    role: string,
    email: string,
    phone: string
}

const phoneRegex = /^\d{11}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const connectionString = 'mongodb://interview-mongo.interview_default:27017/UserData';

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 3001;

const userSearchHandler = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if(req.query.search as string === " ") res.status(400).send("Bad Request");
    if(req.query.search as string === "") res.status(204).send([])
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

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(results);
    }   
    catch (e) {
        console.error("Error searching for users", e);
        res.status(500).send();
    }
}

const postUserHandler = async (req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const {name, email, phone, role}: UserModel = req.body.newUserData;
    console.log(name, email, phone, role);

    if(/\d/.test(name) || name.length > 199) {res.status(400).send({Message: "Bad Request- Invalid Name"}); return};
    if(/\d/.test(role) || name.length > 199) {res.status(400).send({Message: "Bad Request- Invalid Role"}); return};
    if(!phoneRegex.test(phone)) {res.status(400).send({Message: "Bad Request- Invalid Phone Number"}); return};
    if(!emailRegex.test(email) || email.length > 199) {res.status(400).send({Message: "Bad Request- Invalid Email"}); return};

    try { 
        const client = await MongoClient.connect(connectionString);
        const db = client.db();
        const usersCollection = db.collection('users');

        const newUser = {
            name: name,
            email: email,
            phone: phone,
            role: role,
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
