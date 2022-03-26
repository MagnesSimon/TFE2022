# TFE2022

# Backend
Node -v: v16.14.2
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
