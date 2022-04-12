const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
var jwt = require('jsonwebtoken');
var http = require('http').createServer(express);
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
var md5 = require('md5');
//app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json())
//app.use(express.json());

//#############################################################################################

// Clave para cifrado de JWT
const config = {
	llave : "proyectolevidaviddam"
};

app.set('llave', config.llave);

//MiddleWare seguridad token
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
    
    connection.query('SELECT token FROM Sessions WHERE token = ?',[token], (error, result)=>{
        if(error){
            console.log(error)
            res.status(500).end()
        }else{
            if(result.length > 0){
                if (token == result[0].token) {
                    jwt.verify(token, app.get('llave'), (err, decoded) => {      
                      if (err) {
                        return res.json({ mensaje: 'Token inválido' });    
                      } else {
                        req.decoded = decoded;    
                        next();
                      }
                    });
                }else{
                    res.send("session_error")
                }
            }
        }
    })
    
 });

//------------------------------------

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

/*Devuelve un usuario con el USERNAME que recibe en el body.*/
app.post('/user/', (req, res)=>{
    connection.query('SELECT * FROM Users WHERE username = ?',[req.body.username], (error, result)=>{

        if(error){
	    console.log("Usuario NO encontrado")
            console.error(error);
            res.status(500).end();
        }else{
	    console.log("Usuario encontrado")
            res.send(result);
        }
    });
   
    
});


//////////////////////////////////////////////////////////////////////////




app.post('/signup/', (req, res)=>{
    console.log(`${req.body.name}, ${req.body.surname}, ${req.body.email}, ${req.body.password}`)
    connection.query('INSERT INTO Users (name, surname, email, password, username) VALUES (?, ?, ?, ?, ?)',[req.body.name, req.body.surname, req.body.email, req.body.password, req.body.username], (error, result)=>{
        if(error){
            console.error(error)
            res.status(500).end()
        }else{
            console.log(`Usuario ${req.body.username} creado correctamente`)
            res.status(200).end()
        }
    })
});

app.post('/login', (req, res) => {
    console.log(req.body.username+", "+req.body.password)
    connection.query('SELECT password, username FROM Users  WHERE username = ? AND password = ?',[req.body.username, req.body.password], (error, result)=>{
        if(error){
            res.send("login_error")
        }else{
            if(result.length > 0){
                var currentdate = new Date(); 
                var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

                const payload = {
                    username: req.body.username,
                    password: req.body.password,
                    datetime: datetime,
                    check:  true
                };

                const token = jwt.sign(payload, app.get('llave'), {
                    expiresIn: 1440
                });

                connection.query('INSERT INTO Sessions (date_start, token, username) VALUES (?, ?, ?)',[new Date(), token, req.body.username], (error1)=>{
                    if(error1){
                        console.error(error1)
                        res.status(500).end()
                    }else{
                        res.status(200).end()
                        console.log(`Token: ${token} \ninsertado correctamente`)
                    }
                })
                res.send(token)
            }else{
                res.status(500).end()
            }
        
        }
    })
})

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
app.get('/', (req, res)=>{
    console.log(md5('test'));
    res.status(200).end();
});


app.listen(80, () => {
    console.log('Levi,s app listen on port 80');
})

