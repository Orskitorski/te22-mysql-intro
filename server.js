import "dotenv/config"
import nunjucks from "nunjucks"
import express from "express"
import pool from "./db.js"
import morgan from "morgan"
import bodyParser from "body-parser"
import birdsRouter from "./routes/birds.js"
import speciesRouter from "./routes/species.js"

const app = express()
const port = 3000

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"))

app.use("/birds", birdsRouter)
app.use("/species", speciesRouter)

nunjucks.configure("views", {
  autoescape: true,
  express: app,
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})