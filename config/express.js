var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function() {
    var app = express();

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(express.static('./app/public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(expressValidator());


    consign({
        cwd: 'app',
        locale: 'pt-br',
    })
        .include('routes')
        .then('infra')
        .into(app);


    app.use(function(req, res, next){
        res.status(404).render('erros/404');
    });

    app.use(function(erros, req, res, next){
        if(process.env.NODE_ENV == 'production') {
            res.status(500).render('erros/500');
            return;
        }
        next(erros);
    });

    return app;
};