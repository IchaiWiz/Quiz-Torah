import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../AuthContext"; // Assurez-vous que le chemin d'importation est correct

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useContext(AuthContext); // Récupérer la fonction de connexion depuis AuthContext

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("doit contenir au moins 8 caractères");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("doit contenir au moins une majuscule");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("doit contenir au moins une minuscule");
    }

    if (!/\d/.test(password)) {
      errors.push("doit contenir au moins un chiffre");
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("doit contenir au moins un caractère spécial (!@#$%^&*)");
    }

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const passwordErrors = validatePassword(formData.password);

    if (passwordErrors.length > 0) {
      const errorMessage =
        "Le mot de passe " +
        (passwordErrors.length > 1
          ? passwordErrors.slice(0, -1).join(", ") + " et "
          : "") +
        passwordErrors.slice(-1) +
        ".";
      setErrorMessage(errorMessage);
      return;
    }

    // Envoyer les données d'inscription à votre serveur
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        if (data.token) {
          // Définir le message de succès
          setSuccessMessage("Vous êtes inscrit! Vous serez redirigé dans un instant.");
  
          // Utilisez la fonction de connexion depuis AuthContext pour définir le token et le nom d'utilisateur
          login(data.token, data.user.username, data.user.timestamp); // Assurez-vous que la structure de data.user est correcte
          // Redirigez l'utilisateur vers la page d'accueil ou la page souhaitée
          setTimeout(() => {
            window.location.href = '/';
          }, 2000); // Redirection après 2 secondes
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Une erreur s'est produite lors de l'inscription");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        <Avatar style={{ backgroundColor: "teal" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginTop: "10px" }}>
          Sign up
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          id="confirm-password"
          autoComplete="current-password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox checked={showPassword} onChange={handleShowPassword} />
          }
          label="Show password"
        />
        {successMessage && (
      <Alert severity="success" style={{ marginBottom: "10px" }}>
        {successMessage}
      </Alert>
    )}
    {errorMessage && (
      <Alert severity="error" style={{ marginBottom: "10px" }}>
        {errorMessage}
      </Alert>
    )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: "24px 0px 16px" }}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
