const express = require('express');
var body_parser = require('body-parser');
const cors = require('cors');

const path = require('path');
const app = express();
var http = require('http').createServer(express);
app.use(body_parser.urlencoded({extended:true}));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//#############################################################################################


var mysql = require('mysql');

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
    connection.query('SELECT email FROM Users WHERE email = ?',[req.body.email], (error, result)=>{
        //HAY QUE AÑADIR CÓDIGO PARA GESTIONAR QUE NO SE SUBAN DOS CORREOS IGUALES COSHETUMADRE
        if(error) {
            console.error(error);
            res.status(500).end();
        } else {
            console.log(req.body.email+" y "+result)
            if(result == req.body.email) {
                console.error("El usuario con el correo "+req.body.email+" ya está registrado")
                res.send("mail_error");
            } else {
                /*connection.query('INSERT INTO Users (name, surname, email, password, username) VALUES (?, ?, ?, ?, ?)'[req.body.nombre, req.body.apellido, req.body.correo, req.body.contraseña], (error, result)=>{
                    if(error){
                        console.error(error);
                        res.status(500).end();
                    }else{
                        console.log("Usuario creado!")
                    }
                })*/
                res.send(/*result*/"Todo wachin");
            }
        }
    
    });
   
    
});





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

