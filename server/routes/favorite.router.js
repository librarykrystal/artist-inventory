const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// PUT to UPDATE FAVORITE
router.put('/', (req, res) => {
  console.log('PUT req.body.favorite:', req.body.favorite);
  if (req.isAuthenticated()){
    let id = req.body.id;
    let favoriteStatus = req.body.favorite;
    const queryText = `UPDATE inventory SET "favorite" = $2 WHERE id = $1;`;
    pool.query(queryText, [id, favoriteStatus])
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


module.exports = router;