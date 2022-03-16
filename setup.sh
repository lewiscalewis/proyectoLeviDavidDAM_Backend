#Join hamachi network
sudo apt install logmein-hamachi
sudo hamachi login
sudo hamachi join 465-709-324
#Te pedirá la contraseña de la red: estareddasida


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






