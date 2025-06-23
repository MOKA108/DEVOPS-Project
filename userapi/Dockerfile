FROM node:18

# Crée le dossier de l'app
WORKDIR /usr/src/app

# Copie les fichiers nécessaires
COPY package*.json ./
COPY conf ./conf
COPY src ./src

# Installe les dépendances
RUN npm install

# Copie le reste (README, etc. si besoin)
COPY . .

# Expose le port (à adapter selon ton app)
EXPOSE 3000

# Commande de lancement
CMD [ "npm", "start" ]