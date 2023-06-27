import {express} from 'express';

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
})

const userSearchHandler = (req, res) => {
    return
}

const postUserHandler = (req, res) => {
    return
}

app.get("/userSearch", userSearchHandler);
app.post("/user", postUserHandler);


app.get("/status", (req, res) => {
    const status = {
        "Status": "Running"
    };
    res.status(204).send(status);
})
