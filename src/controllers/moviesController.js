const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    add: function (req, res) {
        // Sólo muestra una vista con el formulario para crear el nuevo registro
        res.render('moviesAdd');
    },
    create: function (req, res) {
        // Manda a crear el nuevo registro y redirige al listado
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length
        });
        res.redirect('/movies');
    },
    edit: function(req, res) {
        // Consulta por la película y muestra una vista pidiendo los datos a actualizar
        Movies.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesEdit', {Movie});
            });
    },
    update: function (req,res) {
        // Manda a editar el registro ubicado en el ID correspondiente y redirige al detalle del mismo
        Movies.findByPk(req.params.id)
            .then(() => {
                Movies.update({
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length
                },
                {
                    where: {id: req.params.id}
                })
                    .then(() => {
                        res.redirect('/movies/detail/' + req.params.id);
                    });
            });
    },
    delete: function (req, res) {
        // Consulta por la película y muestra una vista pidiendo confirmación para eliminar
        Movies.findByPk(req.params.id)
            .then(Movie => {
                res.render('moviesDelete', {Movie});
            });
    },
    destroy: function (req, res) {
        // Manda a destruir el registro ubicado en el ID correspondiente y redirige al listado
        Movies.destroy({
            where: {id: req.params.id}
        })
            .then(() => {
                res.redirect('/movies');
            });
    }

}

module.exports = moviesController;