const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);


//Rutas exigidas para la creación del CRUD

// Add será el formulario de nuevo registro
router.get('/movies/add', moviesController.add);
// Create añade el registro a la BD
router.post('/movies/create', moviesController.create);
// Edit será el formulario de edición
router.get('/movies/edit/:id', moviesController.edit);
// Update actualiza el registro de la BD
router.post('/movies/update/:id', moviesController.update);
// Delete será el formulario de confirmación
router.get('/movies/delete/:id', moviesController.delete);
// Destroy borra el registro de la BD
router.post('/movies/delete/:id', moviesController.destroy);

module.exports = router;