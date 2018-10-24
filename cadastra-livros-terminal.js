var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port:3001,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json', 
        // 'Accept': 'text/html'
        'Content-type':'application/json'
    }
};

var cliente = http.request(configuracoes,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log('Corpo: ' + body);
    });
});

var produto = {
    titulo : '',
    descricao: 'node, javascript e um pouco sobre http',
    preco: '100'
}

cliente.end(JSON.stringify(produto));