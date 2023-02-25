const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET (ALL)
router.get('/', (req, res) => {
    // GET route code here
});

// GET (DETAILS of ONE by ID)
router.get('/:id', (req, res) => {
    // GET route code here
})

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