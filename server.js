import "dotenv/config"
import nunjucks from "nunjucks"
import express from "express"
import pool from "./db.js"
import morgan from "morgan"
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

nunjucks.configure("views", {
  autoescape: true,
  express: app,
})

app.get("/birds", async (req, res) => {
  // const [birds] = await pool.promise().query('SELECT * FROM birds')
  const [birds] = await pool
    .promise()
    .query(
      `SELECT birds.*, species.name AS species 
      FROM birds 
      JOIN species ON birds.species_id = species.id;`,
    )
  res.render("birds.njk", {
    title: "Birds",
    birds: birds,
  })
  console.log(birds)
})

app.get('/birds/new', async (req, res) => {
  const [species] = await pool.promise().query('SELECT * FROM species')

  res.render('birds_form.njk', { species })
})

app.get("/birds/:id", async (req, res) => {
  const [birds] = await pool
    .promise()
    .query(
      `SELECT birds.*, species.name AS species 
      FROM birds 
      JOIN species ON birds.species_id = species.id WHERE birds.id = ?;`,
      [req.params.id],
    )
  res.render("bird.njk", {
    title: "Birds",
    name: birds[0].name,
    species: birds[0].species,
    wingspan: birds[0].wingspan,
  })
  //res.json(bird[0]) // ditt jobb är att skapa en res.render med nunjucks här
})

app.get("/species_form", async (req, res) => {
  res.render("species_form.njk")
})

app.post('/species', async (req, res) => {
  const { name, latin, wingspan_min, wingspan_max } = req.body

  const [result] = await pool.promise().query('INSERT INTO species (name, latin, wingspan_min, wingspan_max) VALUES (?, ?, ?, ?)', [name, latin, wingspan_min, wingspan_max])

  res.json(result)
})

app.post('/birds', async (req, res) => {
  const { name, wingspan, species_id } = req.body

  const [result] = await pool.promise().query('INSERT INTO birds (name, wingspan, species_id) VALUES (?, ?, ?)', [name, wingspan, species_id])

  const [species] = await pool
    .promise()
    .query(
      `SELECT species.*, species.name AS speciesname 
      FROM species;`,
    )
  
  res.render("bird.njk", {
    title: "Birds",
    name,
    species: species[species_id-1].speciesname,
    wingspan,
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})