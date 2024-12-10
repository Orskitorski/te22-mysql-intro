import express from "express"
import pool from "../db.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const [species] = await pool
        .promise()
        .query(
            `SELECT species.* FROM species;`,
        )
    res.render("species.njk", {
        title: "Species",
        species: species,
    })
})

router.get("/new", async (req, res) => {
    res.render("species_form.njk", {
        title: "New Species"
    })
})

router.post('/', async (req, res) => {
    const { name, latin, wingspan_min, wingspan_max } = req.body

    const [result] = await pool.promise().query('INSERT INTO species (name, latin, wingspan_min, wingspan_max) VALUES (?, ?, ?, ?)', [name, latin, wingspan_min, wingspan_max])

    res.render("specie.njk", {
        title: "Species",
        name: name,
        wingspanMax: wingspan_max,
        wingspanMin: wingspan_min,
    })
})

router.get("/:id", async (req, res) => {
    const [species] = await pool
        .promise()
        .query(
            `SELECT species.* FROM species WHERE id = ?;`,
            [req.params.id],
        )
    res.render("specie.njk", {
        title: "Species",
        name: species[0].name,
        wingspanMax: species[0].wingspan_max,
        wingspanMin: species[0].wingspan_min,
    })
})

export default router