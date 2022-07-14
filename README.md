   # HELP DESK - LAB2
USUARIO PARA REALIZAR LAS PRUEBAS


## ADMINISTRADOR AREA 1
### Administrador
    - email: admin@correo.com
    - contraseña: 12345678

-----------------------

## CLIENTES
### Cliente
    -email: belen@correo.com
    -contraseña: 12345678

------------------------

## EMPLEADOS
### HelpDesk AREA 2
    - email: matias@correo.com
    - contraseñas: 12345678
### Calidad AREA 3
    -email: gaston@correo.com
    -contraseñas: 12345678
### Ventas AREA 4
    -email: federico@correo.com
    -contraseñas: 12345678
### Tecnico AREA 5
    -email: genaro@correo.com
    -contraseñas: 12345678

------------------------
## Codigo para desplegar las pruebas
 ### Creacion de la base de datos
    -npm install
 ### Creacion de la base de datos
    -npx sequelize-cli db:create
 ### Migracion de los modelos, tablas, relaciones, eventos, trigger, procedures
    -npx sequelize-cli db:migrate
 ### LLenar las tablas (Semillas) con Datos (admin, clientes y empleados)
    -npx sequelize-cli db:seed:all
