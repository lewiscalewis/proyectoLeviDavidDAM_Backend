#Join hamachi network
sudo apt install logmein-hamachi
sudo hamachi login
sudo hamachi join {ID****}
#Te pedirá la contraseña de la red: **************


#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Solo para el desarrollo.
################################################




#Instalar y configurar mysql
sudo apt install mysql-server

sudo mysql


#Cambiamos la contraseña del usuario root. pasará a ser "root".
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'proyectolevidaviddam';

#Aplicamos las modificaciones en los permisos.
FLUSH PRIVILEGES;





#para el control de versiones
sudo apt install git


#install nodejs
sudo apt install nodejs


#install npm 
sudo apt install npm


#para conectarnos a la base de datos en main.js necesitamos la dependencia.
npm install mysql

#mas dependencias del npm
npm install cors
npm install express
npm install http
npm install body-parser
npm install md5
npm install multer
npm install fs
npm install jsonwebtoken



#npm COMPLETO############ //alomejor falta alguno de arriba
npm install express
npm install cors
npm install mysql
npm install jsonwebtoken
npm install md5
npm install multer
npm install socket.io



