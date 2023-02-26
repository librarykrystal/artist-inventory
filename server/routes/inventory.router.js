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
    console.log('Get ITEM by ID req.params.id:', req.params.id);
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
  });

// POST
router.post('/', (req, res) => {
    // POST route code here
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