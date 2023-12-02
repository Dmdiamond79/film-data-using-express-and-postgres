var pool = require('./config')
var express = require('express')
var router = express.Router()

//query

// data seluruh film
router.get('/film', (req, res) => {

    const query = `SELECT * FROM film`

    pool.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.status(200).json(result.rows)
    })

})

// data film berdasarkan id
router.get('/film/:id', (req, res) => {
    const filmId = req.params.id; // Get the film ID from the request parameters

    const query = `SELECT * FROM film WHERE film_id = $1`;

    pool.query(query, [filmId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }

        res.status(200).json(result.rows);
    });
});

// data list category
router.get('/category', (req, res) => {

    const query = `SELECT * FROM category`

    pool.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
            return; 
        }
        res.status(200).json(result.rows)
    })

})


// data list film bedasarkan category
router.get('/film/category/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;

    const query = `
        SELECT film.*
        FROM film
        INNER JOIN film_category ON film.film_id = film_category.film_id
        INNER JOIN category ON film_category.category_id = category.category_id
        WHERE category.name = $1
    `;

    pool.query(query, [categoryName], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        res.status(200).json(result.rows);
    });
});






//end of query


module.exports = router