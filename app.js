// Importation des modules nécessaires:
const express = require("express"); // Express (un framework web pour Node.js)
const morgan = require("morgan"); // Morgan (un middleware de logging pour Express)
const path = require("path"); // Path (un module natif de Node.js)
const errorHandler = require("errorhandler"); // Importation du middleware 'errorhandler' pour la gestion des erreurs en mode développement

// Création de l'application Express
const app = express();

//Définition du numéro de port sur lequel l'application va écouter
const port = process.env.PORT || 3000;

// Importation des routes définies dans le dossier './routes'
const index = require("./routes");

// Initialisation de la base de données
require("./database");

// Configuration des paramètres de l'application
app.set("views", path.join(__dirname, "views")); // des fichiers de vue pug
app.set("view engine", "pug"); // moteur de rendu de vue (pug)

// Utilisation des middlewares

// utilese le middleware de logging Morgan pour enregistrer les requêtes entrantes
app.use(morgan("short"));

// Définit le dossier "public" pour servir les fichiers statiques (css, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Lorsqu'une requête arrive avec un corps au format JSON, le middleware express.json() le parse et le transforme en object JavaScript
app.use(express.json());

// le middleware pour analyser les corps de requête au format x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Utilise les routes définies dans le dossier './routes'
app.use(index);

// Gestion des erreurs basée sur l'environnement de l'application
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler()); // En mode développement, utilise un gestionnaire d'erreurs complet
} else {
  // En production, fournit une réponse d'erreur plus générique
  app.use((err, req, res, next) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}

// Démarre le serveur en écoutant les requêtes sur le port spécifié
app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
