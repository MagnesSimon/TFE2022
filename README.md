# TFE2022

# Backend
Node -v: v16.14.2 <br>
Pour y accèder:
* Dans le répertoire backend, taper la commande nodemon index.js
* http://localhost:3001/

## Modules à installer
** ATTENTION ces modules doivent être installé dans le folder /backend !!**
* npm install express
* npm install cors
* npm install nodemailer
* npm install nodemon
* npm install mysql

## Fonctionnement
1. Dans le dossier "config":
   * Le fichier db.config.js contient les paramètre de connexion à la base de données.
2. Dans le dossier "models":
   * Le fichier db.js établis la connexion
   * Les autres fichiers .models.js effectuent la requête SQL
3. Dans le dossier "controllers":
   * Les fichiers .constrollers.js extrainent les données reçues en réponse de la requête SQL et les traduisent en JSON
4. Dans le dossier "routes":
   * Les fichiers .routes.js définissent le type de méthode SQL (GET - PUT - UPDATE - DELETE) ansi que le path à partir duquel une méthode sera appelée
5. Dans le fichier "index.js":
   * Il faut ajouter un require qui pointent vers le fichier .routes.js

# Frontend
npm -v: 8.5.0 <br>
Version de réact:<br>
![image](https://user-images.githubusercontent.com/55548308/161222275-353890e6-4287-4fd3-b99c-1cefd2745b83.png)

Pour lancer l'application:
* Se trouver dans le répertoire frontend, taper la commande "npm start"
* http://localhost:3000/


