# 🛠️ API REST con Node.js, Express, MongoDB y Docker

Este proyecto es una API REST desarrollada con **Node.js**, **Express** y **MongoDB**, ejecutada en un entorno Dockerizado.

## 🚀 Tecnologías utilizadas
- **Node.js** + **Express.js** 🚀
- **MongoDB** (Base de datos NoSQL)
- **Docker** + **Docker Compose** 🐳
- **PM2** (Administrador de procesos)

Node.js es perfecto para aplicaciones que requieren multiples solicitudes concurrentes, es de alto rendimiento y escalable lo que permite apps rapidas.
Utilizar el framework express.js reduce bastante el tiempo de desarrollo para APIs REST.
Ya que no es una aplicacion muy compleja, usar mongoDB es una excelente opcion ya que permite guardar los datos de manera muy rapida y facilita la lectura de la informacion ya que esta basada en documentos JSON.
Si en algun futuro la aplicacion crece, PM2 es buena opcion para clusterizar la aplicacion y ejecutar multiples instancias lo que permite aprovechar los recursos del servidor.

Documentacion de la api: https://documenter.getpostman.com/view/43446761/2sAYkKJy2w

Ejecutar los siguientes comandos para iniciar la aplicacion:
1. git clone https://github.com/jc-alonsob25/TestPrueba.git
2. cd tu-repositorio
3. docker-compose up --build
