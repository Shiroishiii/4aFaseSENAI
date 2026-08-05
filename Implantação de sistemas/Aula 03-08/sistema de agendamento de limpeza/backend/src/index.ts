import express from "express"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())
const port = 3000;

app.get('/', (req, res) => {
    console.log(req)
    res.send("Hello world")
})

app.listen(port, () => {
    console.log("Servidor ta de pé :p")
})