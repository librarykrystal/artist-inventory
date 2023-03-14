const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// PUT to UPDATE WISHLIST
router.put('/', (req, res) => {
  console.log('PUT req.body.wishlist:', req.body.wishlist);
  if (req.isAuthenticated()){
    let id = req.body.id;
    let wishStatus = req.body.wishlist;
    const queryText = `UPDATE inventory SET "wishlist" = $2 WHERE id = $1;`;
    pool.query(queryText, [id, wishStatus])
    .then((result) => {
        console.log('WISH PUT result:', result);
        res.sendStatus(204);
    })
    .catch((error) => {
        console.log('WISH PUT ERROR:', error);
        res.sendStatus(500);
    })
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;