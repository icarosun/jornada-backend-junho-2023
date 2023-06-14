const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");

// const url = "mongodb://127.0.0.1:27017";
const url = "mongodb+srv://admin:YQqOrt5aU84RZsWZ@cluster1.rduwcc1.mongodb.net";

const client = new MongoClient(url);

//dabase name
const dbName = "ocean_bancodedados_13_06_2023";

async function main() {
    await client.connect();
    console.log("Connected successfulyy to server");
    const db = client.db(dbName);
    const collection = db.collection("herois");

    const app = express();

    app.use(express.json());

    app.get('/', function (req, res) {
        res.send("Hello World!");
    });

    app.get("/oi", function (req, res) {
        res.send("Olá, mundo!!!!!");
    })

    const herois = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];

    app.get("/herois", async function (req, res) {
        const documentos = await collection.find().toArray();
        res.send(documentos);
    });

    app.get("/herois/:id", async function (req, res) {
        const id = req.params.id;

        //const item = herois[id - 1];
        const item = await collection.findOne({
            _id : new ObjectId(id),
        });

        res.send(item);
    })

    app.post("/herois", async function (req, res) {
        console.log(req.body, typeof req.body);

        const item = req.body;

        //herois.push(nome);

        await collection.insertOne(item);

        res.send(item);
    });

    app.put("/herois/:id", async function (req, res) {
        console.log(req.body, typeof req.body);

        const id = req.params.id;

        // const novoNome = req.body.nome;

        // herois[id - 1] = novoNome;

        const item = req.body;

        await collection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: item,
            }
        )

        res.send(item);
    });

    app.delete("/herois/:id", async function (req, res) {
        const id = req.params.id;

        await collection.deleteOne(
            {
                _id: new ObjectId(id)
            }
        )

        res.send("Item removido com sucesso");
    });

    app.listen(process.env.PORT || 3000, function () {
        console.log("Servidor rodando em http:://localhost:3000");
    });

}

main();
    // .catch(console.error)
    // .finally(() => client.close());