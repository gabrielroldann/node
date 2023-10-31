
var express = require('express');
var mysql = require('mysql2');
var cors = require('cors')
var app = express();
app.use(express.json())
app.use(cors())

const users =  [ {"user": "gabriel"},  {"user": "marcos"} ]

app.get('/', function(req, res) {
    res.send("Pag Inicial")
})

app.get('/users',function(req,res) {
    res.send(users)
});

app.get('/user/:id', function(req, res) {
    res.send(users[req.params.id])
})

app.post('/user', function(req, res, next) {
    const user = req.body.user
    const data = { 
        user: user
    }

    var usuarioExistente = false;

    for (let i = 0; i < users.length; i++) {
        // console.log(users[i]);
        // console.log(data);
        if (users[i].user === data.user) {
            usuarioExistente = true;
            break
        }
    }
    
    console.log("teste");
    if (usuarioExistente) {
        res.status(401)
        res.send("Usuário já existe")
        // res.end()
        next()
    } else {
        res.send(data)
    }
});

app.get('/contato', function(req, res) {
    res.send('Pag contato')
})

app.post('/contato', function(req,res) {
    console.log(req.body)
    const nome = req.body.nome
    const email = req.body.email
    const mensagem = req.body.mensagem
    const data = {
        nome: nome,
        email: email,
        mensagem: mensagem
    }
    
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Conectado");

        con.query(`INSERT INTO contato (nome, email, mensagem) VALUES ('${data.nome}', '${data.email}', '${data.mensagem}')`)
            if (err) throw err;
            console.log("Adicionado");
    });

    res.send(data);
});

// retorna json de contatos
app.get('/contatos', function(req, res) {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Conectado");

        const query = "SELECT * FROM contato";
        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result);
            res.send(result);
        })
    })
})

// retorna usuario do email
app.get('/contato/:email', function(req, res) {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Conectado");

        const query = `SELECT * FROM contato WHERE email='${req.params.email}';`
        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result);
            res.send(result)
        })
    })
})

// update
app.put('/contato/:email', (req, res) => {

    const nome = req.body.nome
    const email = req.body.email
    const mensagem = req.body.mensagem
    

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect( (err) => {
        if (err) throw err;
        console.log("Conectado");

        const query = `UPDATE contato SET nome='${nome}', email='${email}', mensagem='${mensagem}' WHERE email='${req.params.email}';`;
        console.log(query);
        con.query(query, (err, result) => {
            if (err) throw err;
            console.log("Update Feito");
            console.log(result);
            res.send(result);
        })
    } )
})

// delete
app.delete('/contato/:email', (req, res) => {

    const email = req.params.email;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect( (err) => {
        if (err) throw err;
        console.log("Conectado")

        const query = `DELETE FROM contato WHERE email='${email}';`
        con.query(query, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
    })
})

app.listen(8080, function() {
    console.log("Servidor ativo na porta 8080");
});
