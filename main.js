const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var http = require('http').createServer(express);
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json())
//app.use(express.json());

//#############################################################################################

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "proyectolevidaviddam",
  database: "proyecto"
});

/*Sample query*/
app.post('/users/', (req, res)=>{
    connection.query('SELECT * FROM Users', (error, result)=>{

        if(error){
            console.error(error);
            res.status(500).end();
        }else{
            res.send(result);
        }
    });
   
    
});

app.post('/signup/', (req, res)=>{
    console.log(`${req.body.name}, ${req.body.surname}, ${req.body.email}, ${req.body.password}`)
    connection.query('INSERT INTO Users (name, surname, email, password, username) VALUES (?, ?, ?, ?, ?)',[req.body.name, req.body.surname, req.body.email, req.body.password, req.body.username], (error, result)=>{
        if(error){
            console.error(error)
            res.status(500).end()
        }else{
            console.log(`Usuario ${req.body.username} creado correctamente`)
            res.send("success")
        }
    })
});

app.post('/check-email', (req, res)=>{
    connection.query('SELECT email FROM Users WHERE email = ?',[req.body.email], (error, result)=>{
        //HAY QUE AÑADIR CÓDIGO PARA GESTIONAR QUE NO SE SUBAN DOS CORREOS IGUALES COSHETUMADRE
        if(error) {
            console.error(error)
            res.status(500).end()
        }else {
            if(result.length > 0){
                console.log(result[0].email)
                if(result[0].email == req.body.email) {
                    console.error("El usuario con el correo "+req.body.email+" ya está registrado")
                    res.send("mail_error")
                 }
            }else{
                res.status(200).end()
            }
        }
    });
});

app.post('/check-username', (req, res)=>{
    connection.query('SELECT username FROM Users WHERE username = ?',[req.body.username], (error1, result1)=>{
        if(error1){
            console.log(error1)
            res.status(500).end()
        }else{
            if(result1.length > 0){
                if(result1[0].username == req.body.username){
                    console.log("El nick del usuario ya está en uso")
                    res.send("username_error")
                }
            }else{
                res.status(200).end()
            }
        }
    })
})


//############################################################################################

/*Sample request*/
app.post('/', (req, res)=>{
    /*connection.query('SELECT U.token FROM levi.users U WHERE U.mail = ''+req.body.mail+'' AND 	U.password =''+req.body.password+''', (error, result)=>{
        if(error){
            console.error(error);
            res.status(500).end();
        }else{
            res.send(result);
        }
    });*/
    res.send("HOLA AMIGOS DE YOUTUBE")
    
});


app.listen(3000, () => {
    console.log('Levi,s app listen on port 3000');
})

