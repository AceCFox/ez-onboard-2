const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET all devices, based on organization id.
 */
router.get("/all/:id", rejectUnauthenticated, (req, res) => {
    const queryString = `
    SELECT "device"."name",  
	"device"."install_date",
  "device"."serial_number",
  "device"."serial_number2",
	"device"."id",
  "device"."breaker_id",
  "device"."type_id",
	"breaker"."name" as "breaker_name",
	"breaker"."limit",
	"breaker"."description",
	"breaker"."site_id",
	"site"."address",
	"site"."first_name",
	"site"."second_name",
	"site"."email",
	"site"."phone",
	ARRAY_AGG ("device_type"."head" || '-Head ' || "device_type"."name") as "type_name" 
FROM "device"
INNER JOIN "device_type" ON "type_id" = "device_type"."id"
INNER JOIN "breaker" ON "breaker_id" = "breaker"."id"
INNER JOIN "site" ON "site_id" = "site"."id"
WHERE "organization_id" = $1
GROUP BY "device"."id",
	"breaker"."name", 
	"breaker"."limit", 
	"breaker"."description",
	"breaker"."site_id",
	"site"."address",
	"site"."first_name",
	"site"."second_name",
	"site"."email",
	"site"."phone"
ORDER BY "device"."id" ASC;`;
    const queryValue = [req.params.id];
    pool
      .query(queryString, queryValue)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log("Error in GET device Router", error);
        res.sendStatus(500);
      });
  });

/**
 * POST new device
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const queryString = `INSERT INTO "device"
    ("type_id", "breaker_id", "serial_number", "serial_number2", "name", "install_date")
    VALUES($1, $2, $3, $4, $5, $6);`;
    const postValues = [
        req.body.type_id,
        req.body.breaker_id,
        req.body.serial_number,
        req.body.serial_number2,
        req.body.name,
        req.body.installation_date
    ]
    pool.query(queryString, postValues)
    .then(()=>{res.sendStatus(201)})
    .catch((error)=>{
     console.log( 'error on POST /api/device/', error);
     res.sendStatus(500)
   })
});

/**
 * UPDATE existing  device
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `UPDATE "device"
  SET "type_id" = $1,
    "breaker_id" = $2,
    "serial_number" = $3,
    "serial_number2" = $4,
    "name" = $5,
    "install_date" = $6
  WHERE id = $7;`;
  const postValues = [
      req.body.type_id,
      req.body.breaker_id,
      req.body.serial_number,
      req.body.serial_number2,
      req.body.name,
      req.body.installation_date,
      req.params.id
  ]
  pool.query(queryString, postValues)
  .then(()=>{res.sendStatus(201)})
  .catch((error)=>{
   console.log( 'error on POST /api/device/', error);
   res.sendStatus(500)
 })
});


/**
 * DELETE existing device
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryString = `DELETE FROM "device"
  WHERE id = $1;`;
  const queryValue = [
      req.params.id
  ]
  pool.query(queryString, queryValue)
  .then(()=>{res.sendStatus(200)})
  .catch((error)=>{
   console.log( 'error on DELETE /api/device/', error);
   res.sendStatus(500)
 })
});

/**
 * GET all serial numbers of devices stored in DB
 */
router.get('/serial', rejectUnauthenticated, (req, res) => {
  const queryString = `SELECT "serial_number" from "device";`;
  pool.query(queryString)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error)=>{
   console.log( 'error in GET /api/device/serial', error);
   res.sendStatus(500)
 })
});

module.exports = router;