const mysql = require("mysql");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const corsOptions = {
  origin: 'http://localhost:3000', // Ou l'URL de votre application front-end
};

app.use(cors(corsOptions));

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

app.post("/signup", async (req, res) => {
  console.log("Signup request received", req.body); // Ajout d'un log
  
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10); // utilisez une "salt" de 10
  console.log("Password hashed"); // Ajout d'un log

  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error("Error inserting into database", err); // Ajout d'un log pour l'erreur
      return res.status(500).json({ error: "Une erreur s'est produite lors de l'inscription" });
    }

    // Créez un token
    const token = jwt.sign({ username: username }, 'your_secret_key', { expiresIn: '1h' });
    console.log("Token created", token); // Ajout d'un log

    // Renvoyez le token et les informations de l'utilisateur au client
    res.json({ 
      message: "Inscription et connexion réussies!", 
      token, 
      user: { 
        username,
        email,
        // inclure d'autres informations utilisateur nécessaires ici
      }
    });
  });
});


// ...autres codes...

app.post("/login", (req, res) => {
  console.log("Login request received", req.body); // Ajout d'un log
  
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error querying database", err); // Ajout d'un log pour l'erreur
      return res.status(500).json({ error: "Une erreur s'est produite lors de la connexion" });
    }

    if (results.length === 0) {
      console.log("No user found with this email"); // Ajout d'un log
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const user = results[0];
    console.log("User found", user); // Ajout d'un log

    const passwordIsValid = await bcrypt.compare(password, user.password);
    
    if (!passwordIsValid) {
      console.log("Password is not valid"); // Ajout d'un log
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Créez un token
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    console.log("Token created", token); // Ajout d'un log

    // Renvoyez le token au client
    res.json({ 
      message: "Connexion réussie!", 
      token, 
      user: { 
        id: user.id,
        username: user.username,
        email: user.email,
        timestamp: user.created_at,
        first_Name: user.first_Name,
        last_Name: user.last_Name,
        // inclure d'autres informations utilisateur nécessaires ici
      }
    });
  });
});

app.post("/update-user", (req, res) => {
  const { userId, newUsername, newEmail, newFirstName, newLastName } = req.body;

  const query = "UPDATE users SET username = ?, email = ?, first_Name = ?, last_Name = ? WHERE id = ?";
  db.query(query, [newUsername, newEmail, newFirstName, newLastName, userId], (err, result) => {
    if (err) {
      console.error("Error updating user in database", err);
      return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour de l'utilisateur" });
    }

    // Requête pour récupérer les informations utilisateur mises à jour
    const retrieveQuery = "SELECT * FROM users WHERE id = ?";
    db.query(retrieveQuery, [userId], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de l'utilisateur mis à jour" });
      }

      const updatedUser = results[0];

      res.json({
        message: "Informations de l'utilisateur mises à jour avec succès!",
        user: updatedUser
      });
    });
  });
});

app.delete('/delete-user', (req, res) => {
  console.log("Query received: ", req.query); // Log the received query

  const { userId } = req.query;

  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user from database", err);
      return res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de l'utilisateur" });
    }

    // Log the result to see if any rows were affected
    console.log("Delete query result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Aucun utilisateur trouvé avec cet ID" });
    }

    res.json({
      message: "Utilisateur supprimé avec succès!"
    });
  });
});
