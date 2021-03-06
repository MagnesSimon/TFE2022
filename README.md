# TFE2022

L'application est disponible en ligne via l'URL suivantes: https://92.222.23.114/  ou encore https://simonmagnes.com 
L'API est disponible en suivant l'URL suivantes: http://92.222.23.114:3001/ 

* Lien vers le github: https://github.com/MagnesSimon/TFE2022.git
* Lien vers le trello: https://trello.com/invite/b/DeF6VLGH/bfd41a6d7af45eeb7d25618e3e3154bd/tfe-2022
* Temps de travail clockify:

![chrome_Jc85tbbLpg](https://user-images.githubusercontent.com/55548308/172236414-a4d60240-0364-400c-8e73-9850de998b5d.png)
![chrome_RiLmUtoPEb](https://user-images.githubusercontent.com/55548308/172236570-92b45c00-6637-4c8c-8812-d52d979002d0.png)


# Backend
Node -v: v16.14.2 <br>
Pour y accèder:
* Dans le répertoire backend, taper la commande nodemon index.js
* http://localhost:3001/

## Modules à installer
**ATTENTION ces modules doivent être installé dans le folder /backend !!**
* npm install express
* npm install cors
* npm install nodemailer
* npm install nodemon
* npm install mysql
* npm i -s react-router-dom sass
   * Permet de router des pages
* npm i axios
   * Axios est utilisé pour le liens vers l'API
   * Mieux que fetch car il transforme le JSON directement en quelque chose de lisible
* npm install @material-ui/core
* npm install dialog-size
* npm install --save react-toastify
* npm install moment --save

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

## Tips
* rsc
   * react-stateless-component a utilisé lors de la création d'un fichier .js
   * Permet de mettre automatiquement le début du code.
* "control + /"
   * Pour mettre une ligne en commentaire   
