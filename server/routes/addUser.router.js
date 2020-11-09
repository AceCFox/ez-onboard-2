const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {rejectUnauthenticated} = require("../modules/authentication-middleware");
const AWS =  require('aws-sdk');
const RDS = new AWS.RDSDataService({region: 'us-east-2'});


router.get("/:id", rejectUnauthenticated, (req, res) => {
    let params = {
      resourceArn: 'arn:aws:rds:us-east-2:635402171575:cluster:aurora-serverless-trial2',
      secretArn: 'arn:aws:secretsmanager:us-east-2:635402171575:secret:rds-db-credentials/cluster-3AHAKDYRE47KCVEKV2KQTHG7TE/postgres-cPjWDP',
      database: 'ez_onboard'

    }

    const queryString = `SELECT * FROM "zefnet_user" WHERE "organization_id" = $1
      ORDER BY "last_name" ASC;`;
    const postValues = [
      req.params.id,
    ];
    pool
      .query(queryString, postValues)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("error on POST /api/add-user/", error);
        res.sendStatus(500);
      });
  });


router.post("/", rejectUnauthenticated, (req, res) => {
  const queryString = `INSERT INTO "zefnet_user"
    ("first_name", "last_name", "email", "phone", "editor", "organization_id")
    VALUES($1, $2, $3, $4, $5, $6);`;
  const postValues = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.phone,
    req.body.editor,
    req.body.organization_id,
  ];
  pool.query(queryString, postValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error on POST /api/add-user/", error);
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const queryString = `DELETE FROM zefnet_user WHERE id = $1;`;
  const postValues = [req.params.id];
  pool
    .query(queryString, postValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error on POST /api/add-user/", error);
      res.sendStatus(500);
    });
});

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const queryString = `UPDATE "zefnet_user"
    SET
    "first_name" = $1, 
    "last_name" = $2, 
    "email" = $3, 
    "phone" = $4, 
    "editor" = $5 
    WHERE
    "id" = $6;`;

  const postValues = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.phone,
    req.body.editor,
    req.params.id,
  ];

  pool
    .query(queryString, postValues)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error on POST /api/add-user/", error);
      res.sendStatus(500);
    });
});

module.exports = router;
