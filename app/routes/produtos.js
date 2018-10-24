//controller da rota
module.exports = function(app) {
    var listaProdutos = function(req, res, next){
            var connection = app.infra.connectionFactory();
            var produtosDAO = new app.infra.ProdutosDAO(connection);

            produtosDAO.lista(function(erros, resultados){    
                if (erros) {
                    return next(erros);
                }
                res.format({
                    html: function(){
                        res.render('produtos/lista',{lista:resultados});
                    },
                    json: function(){
                        res.json(resultados)
                    }
                });
            });
            connection.end({ timeout: 60000 });
        };
    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function(req, res){
        res.render('produtos/form',
            {errosValidacao: {}, produto: {}})
    });
    
    app.post('/produtos', function(req, res){
        var produto = req.body;

        req.assert('titulo','Titulo é obrigatório').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        var erros = req.validationErrors();
    
        if(erros){
            res.format({
                html: function(){
                    res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
                },
                json: function(){
                    res.status(400).json(erros);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto, function(error, resultados){
            res.redirect('/produtos');
        });
    });

}
