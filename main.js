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
const multer = require('multer'); 
var fs = require('fs');
//app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json())
//app.use(express.json());
const request = require('request-promise')
//#############################################################################################

let chat;




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/images')
    },
    filename: function (req, file, cb) {
      cb(null, `${(new Date().getTime())}_${file.originalname}`);
    }
  });

var upload = multer({ storage: storage })






var storageFile = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/music')
    },
    filename: function (req, file, cb) {
      cb(null, `${(new Date().getTime())}_${file.originalname}`);
    }
  });



var uploadFile = multer({ storage: storageFile })







var storageCover = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/covers')
    },
    filename: function (req, file, cb) {
      cb(null, `${(new Date().getTime())}_${file.originalname}`);
    }
  });

var uploadCover = multer({ storage: storageCover })






//SOCKETS
var io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('socket is ready for connection');

    socket.on("start-room", room =>{
        console.log(room)
        socket.join(room)
        chat = room;
    });

    socket.on("message", (msg) => {
        socket.emit("start-room", chat);
        console.log(msg+" en sala "+chat); // world
        io.to(chat).emit("message", msg)
    });

    socket.on("disconnect", ()=>{
        console.log("Desconectando...");
        socket.disconnect();
    });

});


http.listen(2022, () => console.log('listen socket'));

//----------------------------------------------> SOCKECTS - FIN

// Clave para cifrado de JWT
const config = {
	llave : "proyectolevidaviddam"
};

app.set('llave', config.llave);

//MiddleWare seguridad token
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.body.token;

    connection.query('SELECT token FROM Sessions WHERE token = ?',[token], (error, result)=>{
        if(error){
            console.log(error)
            res.status(500).end()
        }else{
            if(result.length > 0){
                if (token == result[0].token) {
                    jwt.verify(token, app.get('llave'), (err, decoded) => {      
                      if (err) {
                          console.log(err)
                        return res.json({ mensaje: 'Token inválido' });    
                      } else {
                        req.decoded = decoded;    
                        next();
                      }
                    });
                }else{
                    res.status(200).send("session_error")
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
app.post('/users', (req, res)=>{
    connection.query('SELECT * FROM Users', (error, result)=>{

        if(error){
            console.error(error);
            res.status(500).end();
        }else{
            res.status(200).send(result);
        }
    });
});


app.post('/save-message', rutasProtegidas, (req, res)=>{
    connection.query(`INSERT INTO Messages (body, date, receptor, emisor) 
    VALUES (
        ?, 
        ?, 
        ?, 
        ?)`, [req.body.message, req.body.date, req.body.receptor, req.body.emisor], (error, response)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).end();
        }
    });
});

app.post('/set-online', rutasProtegidas, (req, res)=>{
    var online = req.body.online == 'true' ? true : false
    connection.query(
        `
       UPDATE Users SET username1 = ?, user WHERE username = ?
        `, [online, req.body.username], (error, response)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send(response);
        }
    });
});


app.post('/get-messages', rutasProtegidas, (req, res)=>{
    connection.query(`
        SELECT * 
        FROM Messages 
        WHERE 
            emisor = ? AND
            receptor = ? OR
            emisor = ? AND 
            receptor = ?`, [req.body.username1, req.body.username2, req.body.username2, req.body.username1], (error, response)=>{
        if(error){
            console.log(error);
        }else{
            res.status(200).send(response);
        }
    });
});

/*Devuelve un usuario con el USERNAME que recibe en el body.*/
app.post('/user/', rutasProtegidas, (req, res)=>{
    connection.query('SELECT * FROM Users WHERE username = ?',[req.body.username], (error, result)=>{

        if(error){
	    console.log("Usuario NO encontrado")
            console.error(error);
            res.status(500).end();
        }else{
	    console.log("Usuario encontrado")
            res.status(200).send(result);
        }
    });
});


//////////////////////////////////////////////////////////////////////////

//desde esta petición obetnemos o creamos las salas de chat
app.post('/chatID/', rutasProtegidas, (req, res)=>{
    connection.query(`SELECT id_chat
        FROM Chats 
        WHERE
            (username1 = ? AND
            username2 = ?) OR
            (username1 = ? AND
            username2 = ?)`,[req.body.username1, req.body.username2, req.body.username2, req.body.username1], (error, result)=>{

        console.log(`Petición para ${req.body.username1} y ${req.body.username2}`)
        if(error){
            console.log("error");
            console.error(error);
            res.status(500).end();
        }else{
	        if(result.length > 0){
                console.log(result[0].id_chat);
                chat = result[0].id_chat;
                res.status(200).send((result[0].id_chat).toString());;
            }else{
                connection.query('INSERT INTO Chats (username1, username2) VALUES (?, ?)', [req.body.username1, req.body.username2], (error1, result1)=>{
                    if(error1){
                        console.log("error al insertar");
                        console.error(error1);
                        res.status(500).end();
                    }else{
                        console.log(`Chat con usuarios ${req.body.username1} y ${req.body.username2}`)
                        res.status(200).end();
                    }
                });
            }
        }
    });
});


app.post('/signup/', (req, res)=>{
    console.log(`${req.body.name}, ${req.body.surname}, ${req.body.email}, ${req.body.password}`)
    img = 'default.png'
    connection.query('INSERT INTO Users (name, surname, email, password, username, profileImage) VALUES (?, ?, ?, ?, ?, ?)',[req.body.name, req.body.surname, req.body.email, req.body.password, req.body.username, img], (error, result)=>{
        if(error){
            console.error(error)
            res.status(500).end()
        }else{
            console.log(`Usuario ${req.body.username} creado correctamente`)
            res.status(200).end()
        }
    })
});

//vía correo electrónico por pérdida de datos
app.post('/reset-password', (req, res)=>{
    connection.query('UPDATE Users SET password = ? WHERE email = ?',[req.body.password, req.body.email], (error, result)=>{
        if(error){
            console.error(error)
            res.status(500).end()
        }else{
            console.log('Contraseña actualizada')
            res.status(200).end()
        }
    })
})

//vía ajustes de usuario ya logeado
app.post('/reset-password-settings', rutasProtegidas, (req, res)=>{
    connection.query('UPDATE Users SET password = ? WHERE username = ?',[req.body.password, req.body.username], (error, result)=>{
        if(error){
            console.error(error)
            res.status(500).end()
        }else{
            console.log('Contraseña actualizada')
            res.status(200).end()
        }
    })
})

app.post('/update-state', rutasProtegidas, (req, res)=>{
    connection.query('UPDATE Users SET state = ? WHERE username = ?',[req.body.state, req.body.username], (error, result)=>{
        if(error){
            console.error(error)
            res.status(500).end()
        }else{
            console.log(`${req.body.state}, ${req.body.username}`)
            console.log('Estado actualizado '+result)
            res.status(200).end()
        }
    })
})

app.post('/login', (req, res) => {
    console.log(req.body.username+", "+req.body.password)
    connection.query('SELECT password, username FROM Users  WHERE username = ? AND password = ?',[req.body.username, req.body.password], (error, result)=>{
        if(error){
            res.status(200).send("login_error")
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
                    expiresIn: (3600*24)
                });

                connection.query('INSERT INTO Sessions (date_start, token, username) VALUES (?, ?, ?)',[new Date(), token, req.body.username], (error1)=>{
                    if(error1){
                        console.error(error1)
                        connection.query('UPDATE Sessions SET date_start = ?, token = ? WHERE username = ?',[new Date(), token, req.body.username], (error2)=>{
                            if(error2){
                                console.log(error2)
                                res.status(500).end()
                            }else{
                                console.log("Update sobre session hecho!")
                                res.status(200).end()
                            }
                        })
                    }else{
                        res.status(200).end()
                        console.log(`Token: ${token} \ninsertado correctamente`)
                    }
                })
                res.status(200).send(token)
            }else{
                res.status(500).end()
            }
        
        }
    })
})

//petición para comprobar mails PARAMETROS: email
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
                    res.status(200).send("mail_error")
                 }
            }else{
                res.status(200).end()
            }
        }
    });
});

//petición para comprobar usuarios PARAMETROS: username
app.post('/check-username', (req, res)=>{
    connection.query('SELECT username FROM Users WHERE username = ?',[req.body.username], (error1, result1)=>{
        if(error1){
            console.log(error1)
            res.status(500).end()
        }else{
            if(result1.length > 0){
                if(result1[0].username == req.body.username){
                    console.log("El nick del usuario ya está en uso")
                    res.status(200).send("username_error")
                }
            }else{
                res.status(200).end()
            }
        }
    })
});

//petición para obtener items PARAMETROS: token, username
app.post('/items', rutasProtegidas, (req, res)=>{
    connection.query(
        `SELECT *
        FROM Items M
            INNER JOIN Users U ON U.username = M.owner
        WHERE
            U.username = ?`, [req.body.username], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            res.status(200).send(resp)
        }
    });
});

//petición para recoger todos los usuarios que no sean amigos (MÁX lista de 50 usuarios)
app.post('/get-noFriends', rutasProtegidas, (req, res)=>{
    connection.query(
        `
		SELECT 
            *
        FROM Users U
        WHERE 
            U.username NOT IN (
				SELECT U.username FROM Users U
				JOIN (SELECT IF(C.username1 = ?, username2, username1) as username
				FROM Chats C 
				WHERE
					username1 = ? OR
					username2 = ?) as C
				ON U.username = C.username
            )`, [req.body.username, req.body.username, req.body.username, req.body.username, req.body.username], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            console.log(resp)
            res.status(200).send(resp)
        }
    });
});

app.post('/find-users', rutasProtegidas, (req, res)=>{ 
    connection.query(`SELECT *
        FROM Users U
        WHERE
            U.username LIKE ? AND
            U.username != ? AND 
            U.username NOT IN (
                SELECT username1
                FROM Chats C
                WHERE
                    username1 = ? OR
                    username2 = ?) AND
            U.username NOT IN (
                SELECT username2
                FROM Chats C
                WHERE
                    username1 = ? OR
                    username2 = ?
            )`, ['%'+req.body.username+'%', req.body.me, req.body.me, req.body.me, req.body.me, req.body.me], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            res.status(200).send(resp)
        }
    });
});

app.post('/get-contacts', rutasProtegidas, (req, res)=>{ 
    connection.query(`
    SELECT * FROM Users U
    JOIN (SELECT IF(C.username1 = ?, username2, username1) as username
        FROM Chats C 
        WHERE
            username1 = ? OR
            username2 = ?) as C
        ON U.username = C.username`, [req.body.username, req.body.username, req.body.username], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            console.log(resp)
            res.status(200).send(resp)
        }
    });
});

app.post('/get-contacts-filter', rutasProtegidas, (req, res)=>{ 
    connection.query(`SELECT *
    FROM Users U
    JOIN (  SELECT IF(C.username1 = ?, username2, username1) as username
            FROM Chats C
            WHERE
                C.username1 LIKE ? AND
                C.username2 = ? OR
                C.username2 LIKE ? AND
                C.username1 = ?) as C
    ON U.username = C.username`, [req.body.username,"%"+req.body.friend+"%", req.body.username, "%"+req.body.friend+"%", req.body.username], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            console.log(resp)
            res.status(200).send(resp)
        }
    });
});

app.post('/add-friend', rutasProtegidas, (req, res)=>{ 
    connection.query(`
    INSERT INTO Chats
    (username1, username2) 
    VALUES (?, ?)`, [req.body.username1, req.body.username2], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            res.status(200).end()
        }
    });
});

app.post('/decline-request', rutasProtegidas, (req, res)=>{ 
    connection.query(`DELETE FROM Friend_Requests WHERE emisor = ? AND receptor = ?`, [req.body.emisor, req.body.receptor], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            res.status(200).end()
        }
    });
});

app.post('/set-notifications', rutasProtegidas, (req, res)=>{ 
    connection.query(`INSERT INTO Notifications VALUES(?, ?, ?)`, [req.body.receptor, req.body.emisor, req.body.notification], (err, resp)=>
    {
        if(err){
            console.log(err)
            connection.query(`UPDATE Notifications SET notifications = ? WHERE emisor = ? AND receptor = ?`, [req.body.notification, req.body.emisor, req.body.receptor], (err1, res1)=>{
                if(err1){
                    console.log(err1);
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            })
        }else{
            res.status(200).end()
        }
    });
});

app.post('/get-notifications', rutasProtegidas, (req, res)=>{ 
    connection.query(`SELECT notifications FROM Notifications N Where N.emisor = ? AND N.receptor = ?`, [req.body.emisor, req.body.receptor], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            console.log(resp)
            res.status(200).send(resp)
        }
    });
});

app.post('/get-friend-requests', rutasProtegidas, (req, res)=>{ 
    connection.query(`SELECT *
    FROM Friend_Requests F
    WHERE
        receptor = ?`, [req.body.username, req.body.username], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            res.status(200).send(resp)
        }
    });
});

app.post('/find-contact', rutasProtegidas, (req, res)=>{ 
    connection.query(`SELECT C.id_chat
    FROM Chats C
    WHERE
        username1 = ? AND
        username2 = ? OR
        username1 = ? AND
        username2 = ?`, [req.body.username1, req.body.username2, req.body.username2, req.body.username1], (err, resp)=>
    {
        if(err){
            console.log(err)
            res.status(500).end()
        }else{
            res.status(200).send(resp)
        }
    });
});

app.post('/friend-request', rutasProtegidas, (req, res)=>{ 
    
    connection.query(`
        SELECT receptor 
        FROM Friend_Requests
        WHERE 
            emisor = ? AND 
            receptor = ?
                `, [req.body.emisor, req.body.receptor], (e, r)=>{
            if(e){
                console.error(e)
                res.status(500).end()
            }else{
                if(r.length > 0){
                    res.status(500).end()
                }else{
                    connection.query(`INSERT INTO
                    Friend_Requests
                    (emisor, receptor)
                    VALUES
                        (?,
                        ?)`, [req.body.emisor, req.body.receptor], (err, resp)=>
                    {
                        if(err){
                            console.log(err)
                            res.status(500).end()
                        }else{
                            res.status(200).end()
                        }
                    });
                }
            }
    });

});

//############################################################################################
//Test upload file.
//-Parametros (token, username, image), FORM-DATA
app.post('/upload-image', upload.single('image'), rutasProtegidas,  (req, res)=> {
    connection.query('UPDATE Users SET profileimage = ? WHERE username = ?',[req.file.filename, req.body.username], (err, response)=>{
        if(err){
            console.log(req.file.filename)
            res.status(500).end();
        }else{
            console.log("Imagen subida")
            res.send('Completed task');
        }
    });
});

app.post('/upload-file', uploadFile.single('file'), rutasProtegidas, (req, res)=> {
    console.log(req.file)
    connection.query('INSERT INTO Items VALUES (?, ?)',[req.file.filename, req.body.username], (err, response)=>{
        if(err){
            res.status(500).end();
        }else{
            console.log("Item subida")
            res.send('Completed task');
        }
    });
});
///////////////////////////////////////////////////////
//-Parametros (token, username)  WWW-URL-ENCODED
app.post('/getImage', (req, res)=>{ 
        console.log("/getImage called");
        var image;

        connection.query('SELECT profileimage FROM Users WHERE username = ?',[req.body.username], (err, response)=>{
            if(err){
                console.log(err)
                res.status(500).end();
            }else{
                image = response[0].profileimage;
                fs.readFile("assets/images/"+image, 'binary', function (err, data) {
                    if(err) {
                        console.log('error', err);
                    }else{
                         var stat = fs.statSync("assets/images/"+image);
                     
                         /*res.setHeader('Content-Length', stat.size);
                         res.setHeader('Content-Type', 'image/*');
                         res.setHeader('Content-Disposition', 'attachment; filename=sample');
                         res.writeHead(200, {
                            'Content-Type': 'image/*',
                            'Content-Length': stat.size,
                            'Content-Disposition': 'attachment; filename=your_file_name'
                        });*/
			
                         res.status(200).send(data)
                    }
             });
            }
        });
});

app.post('/tt', (req, res)=>{ 
var movie = path.resolve('./assets/images/' + /*req.params.filename*/"1651075873596_Screenshot (7).png");

        fs.stat(movie, function (err, stats) {

            var range = req.headers.range;

            if (!range) {

                return res.sendStatus(416);

            }

            //Chunk logic here
            var positions = range.replace(/bytes=/, "").split("-");
            var start = parseInt(positions[0], 10);
            var total = stats.size;
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end - start) + 1;

            res.writeHead(206, {

                'Transfer-Encoding': 'chunked',

                "Content-Range": "bytes " + start + "-" + end + "/" + total,

                "Accept-Ranges": "bytes",

                "Content-Length": chunksize,

                "Content-Type": mime.lookup(req.params.filename)

            });

            var stream = fs.createReadStream(movie, { start: start, end: end, autoClose: true })

                .on('end', function () {

                    console.log('Stream Done');

                })

                .on("error", function (err) {

                    res.end(err);

                })

                .pipe(res, { end: true });

        });

});

//test solo
app.post('/download-image-test', function (req, res) {
	console.log(req.body.username)
    //Sacar la imagen/file de sql segun el username
    var filepath = '/home/usuario/proyectoLeviDavidDAM_Backend/assets/images/1651356424934_Screenshot (2).png'
    res.sendFile(filepath);
});

		
		
	
//Parametros:
	//token
	//username		nombre de usuario
//Endpoint de David para descargar 1 imagen de perfil.
app.post('/download-image', rutasProtegidas, (req, res)=>{ 
        console.log("/download-image called");
        var image;

        connection.query('SELECT profileimage FROM Users WHERE username = ?',[req.body.username], (err, response)=>{
            if(err){
                console.log(err)
                res.status(500).end();
            }else{
                image = response[0].profileimage;
                var filepath = '/home/usuario/proyectoLeviDavidDAM_Backend/assets/images/'+image;
			    			res.sendFile(filepath);
            }
        });
});
		



//Parametros:
	//token
	
	//name		nombre de la canción
	//author	username del autor
	//genere	genero del choicebox
	//description	descripcion del textarea
	//copyright	boolean del choicebox
	//uploadDate	string fecha actual

	//item		mp3
	//cover		png
app.post('/upload-item', uploadFile.single('file'), rutasProtegidas,  (req, res)=> {
	var token = req.body.token;
	var name = req.body.name;
	var author = req.body.author;
	var genere = req.body.genere;
	var description = req.body.description;
	var copyright = req.body.copyright;
	var uploadDate = req.body.uploadDate;
	
	var item = req.file.filename;
	
	//console.log("token= "+name);
	console.log("name= "+name);
	console.log("author= "+author);
	console.log("genere= "+genere);
	console.log("description= "+description);
	console.log("copyright= "+copyright);
	console.log("uploadDate= "+uploadDate);
	console.log("item= "+req.file.filename);
	
    connection.query('INSERT INTO Items(name, username, genere, description, copyright, uploadDate, item) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.body.name, req.body.author, req.body.genere, req.body.description, "1", req.body.uploadDate, req.file.filename], (err, response)=>{
        if(err){
		console.log(err)
            res.status(500).end();
        }else{
            console.log("Item subida")
            res.status(200).send(response.insertId.toString())
        }
    });
	
	//Inserta el item, sin cover, y devuelve el id generado automaticamente en la petición
	//Para que el cliente pueda subir el cover con ese id.
	
	
	
	//var cover = req.cover.filename;
    /*connection.query('UPDATE Items SET cover = ? WHERE username = ?',[req.file.filename, req.body.username], (err, response)=>{
        if(err){
            console.log(req.file.filename)
            res.status(500).end();
        }else{
            console.log("Imagen subida")
            res.send('Completed task');
        }
    });*/
	
});




//Endpoint de David para descargar 1 cancion
app.get('/download-item/:itemid', (req, res)=>{ 
        console.log("/download-item called"+req.params.itemid);
        var image;

        connection.query('SELECT item FROM Items WHERE id = ?',[parseInt(req.params.itemid)], (err, response)=>{
            if(err){
                console.log(err)
                res.status(500).end();
            }else{
                itm = response[0].item;
                var filepath = '/home/usuario/proyectoLeviDavidDAM_Backend/assets/music/'+itm;
			    			res.sendFile(filepath);
            }
        });
});

// Get all music para el home page
app.post('/all-items/',rutasProtegidas, (req, res)=>{
    connection.query('SELECT * FROM Items', (error, result)=>{

        if(error){
            console.error(error);
            res.status(500).end();
        }else{
            res.status(200).send(result);
        }
    });
});
		

//Get user music para el profile page.
//Devuelve las canciones de un usuario
app.post('/user-items/',rutasProtegidas, (req, res)=>{
    connection.query('SELECT * FROM Items WHERE username = ?',[req.body.username], (error, result)=>{

        if(error){
            console.error(error);
            res.status(500).end();
        }else{
            res.status(200).send(result);
        }
    });
});




/*		
app.get('/song-test', function (req, res) {
    var filepath = '/home/usuario/proyectoLeviDavidDAM_Backend/assets/music/song.mp3'
    res.sendFile(filepath);
})	
		
		
app.get('/song/:itemid', function (req, res) {
	console.log("song itemid: "+req.params.itemid); 
    var filepath = '/home/usuario/proyectoLeviDavidDAM_Backend/assets/music/song.mp3'
    res.sendFile(filepath);
})	
			
		
		
app.get('/download-file', function (req, res) {
    var filepath = '/home/usuario/proyectoLeviDavidDAM_Backend/assets/images/1651356424934_Screenshot (2).png'
    res.sendFile(filepath);
})*/

app.get('/', (req, res)=>{
    console.log(md5('test'));
    res.status(200).end();
});


app.listen(80, () => {
    console.log('Levi,s app listen on port 80');
});


