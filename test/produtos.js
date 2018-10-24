var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');

describe('#ProdutosController',function(){
    var conn = express.infra.connectionFactory();
    var databaseCleaner = new DatabaseCleaner('mysql');

    // this.beforeEach(function(done){
    //     conn.query("delete from livros", function(ex, result){
    //         if(!ex) {
    //             done();
    //         }
    //     });
    // });

    it('#listagem json',function(done){
        request.get('/produtos')
        .set('Accept','application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('#listagem html',function(done){
        request.get('/produtos')
        .set('Accept','text/html')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });

    it('#cadastro de novos produtos com dados inválidos', function(done){
        request.post('/produtos')
        .send({titulo: "titulo", descricao: "novo livro"})
        .expect(400, done)
    });

    it('#cadastro de novo produtos com dados válidos', function(done){
        request.post('/produtos')
        .send({titulo: "titulo", descricao: "novo livro", preco: 10.10})
        .set('Accept','application/json')
        .set('Accept','text/html')
        .expect(302, done)
    });

    this.afterAll(function(){
        databaseCleaner.clean(express.infra.connectionFactory(), function() {
            done();
        });
    });

});

// var http = require('http');
// var assert = require('assert');

// describe('ProdutosController',function(){

//     it('listagem json',function(done){
//         var configuracoes = {
//             hostname: 'localhost',
//             port:3001,
//             path:'/produtos',
//             headers: {
//                 'Accept' : 'application/json'
//             }
//         };

//         http.get(configuracoes,function(res){
//             assert.equal(res.statusCode, 200);
//             assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
//             done();
//         });       
//     });
// });
// ['content-type'], text/html; charset=utf-8