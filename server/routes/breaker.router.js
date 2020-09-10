const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
        //console.log(response)
    })
    .catch((error)=>{
     res.sendStatus(500)
     console.log( 'error on POST /api/breaker/', error);
   })
});

module.exports = router;
