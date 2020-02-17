const express = require('express');

const db = require("../data/dbConfig")

const router = express.Router();
// Tested
router.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "failed to get the list of accounts" });
        })
})
// Tested
router.get("/:id", (req, res) => {
    const id = req.params.id
    getById(id)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => { 
            console.log(err)
            res.status(500).json({ error: "failed to get the account info" });
        })

});

router.post("/", (req, res) => {
    db("accounts")
    .insert(req.body, "id")
    .then(ids => { 
        return getById(ids[0]).then(inserted => {
            res.status(201).json(inserted)
        })
    })
    .catch(error => {
        console.log(error);
  
        res.status(500).json({ error: "failed to add the post" });
      });
})

router.put("/:id", (req, res) =>{
    const { id } = req.params
    const change = req.body
    db("accounts")
        .where(id)
        .insert(change)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(err => { 
            console.log(err)
            res.status(500).json({ error: "failed to get the account info" });
        })
})


module.exports = router

function getById(id) {
    return db("accounts")
      .where({ id })
      .first();
  }