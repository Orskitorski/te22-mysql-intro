import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/birds", async (req, res) => {
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

router.get("/birds/new", async (req, res) => {
    const [species] = await pool.promise().query('SELECT * FROM species')

    res.render('birds_form.njk', {
        species,
        title: "New Bird"
    })
})

router.get("/birds/:id", async (req, res) => {
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
})

router.post('/birds', async (req, res) => {
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

export default router