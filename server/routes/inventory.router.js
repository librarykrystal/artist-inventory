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
      let queryText = `SELECT * FROM "inventory" WHERE "user_id" = $1 ORDER BY "id" DESC`;
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
    // only do GET if authenticated:
  if (req.isAuthenticated()){
    let id = req.params.id;
    const queryText = `SELECT * FROM inventory WHERE "id" = $1 AND "user_id" = ${req.user.id};`;
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
  console.log('REQ.BODY for WISHLIST ADD:', req.body);
  // only do POST if authenticated:
  if (req.isAuthenticated()){
    const addQuery = `
    INSERT INTO "inventory" ("user_id", "type", "name", "hex", "medium", "brand", "body", "container", "size", "notes", "favorite", "line", "toxic", "wishlist", "opacity")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING "id";`
    pool.query(addQuery, [
      req.user.id,
      req.body.type,
      req.body.name,
      req.body.hex,
      req.body.medium,
      req.body.brand,
      req.body.body,
      req.body.container,
      req.body.size,
      req.body.notes,
      req.body.favorite,
      req.body.line,
      req.body.toxic,
      req.body.wishlist,
      req.body.opacity
    ])
    .then(result => {
      console.log('New item ID:', result.rows[0].id);
      // const newItemId = result.rows[0].id
      res.send({ id: result.rows[0].id });
    }).catch(err => {
      console.log('first query ERROR:', err);
      res.sendStatus(500)
    })
  } else {
    res.sendStatus(403);
  }
});

// PUT to UPDATE ITEM
router.put('/', (req, res) => {
  console.log('PUT req.body:', req.body);
  if (req.isAuthenticated()){
    // let id = req.body.id;
    const editQuery = `UPDATE "inventory" SET 
    "type" = $2, 
    "name" = $3, 
    "hex" = $4, 
    "medium" = $5, 
    "brand" = $6, 
    "body" = $7, 
    "container" = $8, 
    "size" = $9, 
    "notes" = $10, 
    "favorite" = $11, 
    "line" = $12,
    "toxic" = $13,
    "opacity" = $14
    WHERE id = $1;`;
    pool.query(editQuery, [
      req.body.id,
      req.body.type,
      req.body.name,
      req.body.hex,
      req.body.medium,
      req.body.brand,
      req.body.body,
      req.body.container,
      req.body.size,
      req.body.notes,
      req.body.favorite,
      req.body.line,
      req.body.toxic,
      req.body.opacity
    ])
    .then((result) => {
        console.log('PUT result:', result);
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('PUT ERROR:', error);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  console.log('router.delete ID:', req.params.id);
  // only do DELETE if authenticated:
  if (req.isAuthenticated()){
    let id = req.params.id;
    const queryText = `DELETE FROM inventory WHERE id = $1;`;
    pool.query(queryText, [id])
    .then((result) => {
        console.log('DELETE result:', result);
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('DELETE ERROR:', error);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;