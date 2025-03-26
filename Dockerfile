# Usar la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar dependencias y PM2 globalmente
RUN npm install && npm install -g pm2

# Copiar todo el código del backend
COPY . .

# Exponer el puerto del backend
EXPOSE 3800

# Iniciar la aplicación con PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
