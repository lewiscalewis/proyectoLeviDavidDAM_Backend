

sudo apt install mysql-server
#Configure mysql-sqver. to do that login as root user
sudo mysql


#Once logged in the mysql shell.Change root user's password.
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

#Aplicamos las modificaciones en los permisos.
FLUSH PRIVILEGES;


#para conectarnos a la base de datos en main.js necesitamos la dependencia.
npm install mysql
