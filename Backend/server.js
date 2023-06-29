const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');


app.use(cors());

// Créer une connexion à la base de données
const db = mysql.createConnection({
  host: "database-torah-quiz.cwjgekl2r5ns.eu-north-1.rds.amazonaws.com", // Le point de terminaison de votre base de données RDS
  user: "Ichai_wiz", // Le nom d'utilisateur de votre base de données RDS
  password: "Azertyui8", // Le mot de passe de votre base de données RDS
  database: "torah_quiz_db", // Le nom de votre base de données dans RDS
});


// Connecter à la base de données
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connecté à la base de données");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}


app.get("/categories", (req, res) => {
  const query = "SELECT * FROM categories"; // Remplacez 'categories' par le nom de votre table de catégories
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          error:
            "Une erreur s'est produite lors de la récupération des catégories",
        });
    }
    res.json(results);
  });
});

app.get("/sub_categories", (req, res) => {
  const categoryId = req.query.category_id;
  const query = "SELECT * FROM sub_categories WHERE category_id = ?";
  db.query(query, [categoryId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          error:
            "Une erreur s'est produite lors de la récupération des sous-catégories",
        });
    }
    res.json(results);
  });
});

app.get("/sub_sub_categories", (req, res) => {
  const subCategoryId = req.query.sub_category_id;
  const query = "SELECT * FROM sub_sub_categories WHERE sub_category_id = ?";
  db.query(query, [subCategoryId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          error:
            "Une erreur s'est produite lors de la récupération des sous-sous-catégories",
        });
    }
    res.json(results);
  });
});

app.get("/sub_sub_sub_categories", (req, res) => {
  const subSubCategoryId = req.query.sub_sub_category_id;
  const query =
    "SELECT * FROM sub_sub_sub_categories WHERE sub_sub_category_id = ?";
  db.query(query, [subSubCategoryId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          error:
            "Une erreur s'est produite lors de la récupération des sous-sous-sous-catégories",
        });
    }
    res.json(results);
  });
});

app.get("/search", (req, res) => {
  const searchTerm = req.query.q;
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  const query = `
    SELECT 'category' AS type, id, name FROM categories WHERE LOWER(name) LIKE ?
    UNION
    SELECT 'sub_category' AS type, id, name FROM sub_categories WHERE LOWER(name) LIKE ?
    UNION
    SELECT 'sub_sub_category' AS type, id, name FROM sub_sub_categories WHERE LOWER(name) LIKE ?
    UNION
    SELECT 'sub_sub_sub_category' AS type, id, name FROM sub_sub_sub_categories WHERE LOWER(name) LIKE ?
  `;

  db.query(query, [`%${lowerSearchTerm}%`, `%${lowerSearchTerm}%`, `%${lowerSearchTerm}%`, `%${lowerSearchTerm}%`], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          error: "Une erreur s'est produite lors de la recherche",
        });
    }
    res.json(results);
  });
});


app.get("/random_category", (req, res) => {
  const query = `
    SELECT 'category' AS type, id, name, image_url, description FROM categories
    UNION
    SELECT 'sub_category' AS type, id, name, image_url, description FROM sub_categories
    UNION
    SELECT 'sub_sub_category' AS type, id, name, image_url, description FROM sub_sub_categories
    UNION
    SELECT 'sub_sub_sub_category' AS type, id, name, image_url, description FROM sub_sub_sub_categories
    ORDER BY RAND()
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          error: "Une erreur s'est produite lors de la récupération d'une catégorie aléatoire",
        });
    }
    res.json(results[0]);
  });
});

