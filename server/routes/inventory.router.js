const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET (ALL)
router.get('/', (req, res) => {
  console.log('inventory GET route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  // only do GET if authenticated:
  if (req.isAuthenticated()){
      let queryText = `SELECT * FROM "inventory" WHERE "user_id" = $1`;
      pool.query(queryText, [req.user.id]).then((result) => {
          res.send(result.rows);
      }).catch((error) => {
          console.log(error);
          res.sendStatus(500);
      });
  } else {
      res.sendStatus(403);
  }
});

// GET (DETAILS of ONE by ID)
router.get('/:id', (req, res) => {
  console.log('inventory GET ONE route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  console.log('Get ITEM by ID req.params.id:', req.params.id);
  if (req.isAuthenticated()){
    let id = req.params.id;
    const queryText = `SELECT * FROM inventory WHERE id = $1;`;
    pool.query(queryText, [id])
    .then((result) => {
        console.log('GET ITEM by ID RESULTS:', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('Get ITEM by ID ERROR:', error);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
  });

// POST
router.post('/', (req, res) => {
  console.log('inventory POST route');
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  const addQuery = `
  INSERT INTO "inventory" ("user_id", "type", "name", "hex", "medium", "brand", "body", "container", "size", "notes", "favorite")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  RETURNING "id";`
  pool.query(addQuery, [
    req.body.user,
    req.body.type,
    req.body.name,
    req.body.hex,
    req.body.medium,
    req.body.brand,
    req.body.body,
    req.body.container,
    req.body.size,
    req.body.notes,
    req.body.favorite
  ])
  .then(result => {
    console.log('New item ID:', result.rows[0].id);
    // const newItemId = result.rows[0].id
  }).catch(err => {
    console.log('first query ERROR:', err);
    res.sendStatus(500)
  })
});



// PUT to mark favorite
router.put('/', (req, res) => {
    // PUT route code here
});

// DELETE
router.delete('/', (req, res) => {
    // DELETE route code here
});

module.exports = router;