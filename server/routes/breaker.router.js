const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const AWS = require ('aws-sdk');


const {rejectUnauthenticated} = require("../modules/authentication-middleware");

router.get('/:id', rejectUnauthenticated, (req,res)=>{
    const queryString = `SELECT * FROM breaker WHERE site_id = $1`;
    pool.query(queryString, [req.params.id])
        .then(result=>{
    
            res.send(result.rows)
        })
        .catch(error=>{
            console.log('Error getting breakers from database:', error)
            res.sendStatus(500);
        })
})

router.post('/', rejectUnauthenticated, (req, res) => {
    const queryString = `INSERT INTO "breaker"
    ("name", "limit", "description", "site_id")
    VALUES($1, $2, $3, $4) RETURNING "id";`;
    const postValues = [
        req.body.name,
        req.body.limit,
        req.body.description,
        req.body.site_id,
    ]
    pool.query(queryString, postValues)
    .then((response)=>{res.send(response.rows)
    })
    .catch((error)=>{
     console.log( 'error on POST /api/breaker/', error);
     res.sendStatus(500)
   })
});

/**
 * EDIT existing breaker
 */
router.put('/', rejectUnauthenticated, (req, res) => {
    const queryString = `UPDATE "breaker"
    SET "name" = $1,
      "limit" = $2,
      "description" = $3
      WHERE "id" = $4;`;
    const editValues = [
        req.body.name,
        req.body.limit,
        req.body.description,
        req.body.id,
    ]
    pool.query(queryString, editValues)
    .then(()=>{res.sendStatus(200)})
    .catch((error)=>{
        console.log( 'error on PUT /api/breaker/', error);
        res.sendStatus(500)
   })
  });

module.exports = router;
