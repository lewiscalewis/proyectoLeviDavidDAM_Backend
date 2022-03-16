const express = require('express');
const cors = require('cors');

const path = require('path');
const app = express();
var http = require('http').createServer(express);
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

