import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import {
  Button,
  TextField,
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function validatePassword(password) {
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
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordErrors = validatePassword(password);

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

    // Envoie les informations de connexion au serveur
    fetch("http://localhost:5000/login", {
      // Modifiez l'URL si nécessaire
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          // Utilisez la fonction de connexion depuis AuthContext pour définir le token et le nom d'utilisateur
          login(data.token, data.user.username, data.user.timestamp, data.user.email, data.user.id, data.user.first_Name, data.user.last_Name); // Assurez-vous que la structure de data.user est correcte

          // Définir le message de succès
          setSuccessMessage(
            "Vous êtes connecté, vous serez redirigé dans un instant."
          );

          // Redirigez l'utilisateur vers la page d'accueil ou la page souhaitée après un délai
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Connexion
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mot de passe"
          type={passwordVisible ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              checked={passwordVisible}
              onChange={() => setPasswordVisible(!passwordVisible)}
            />
          }
          label="Afficher le mot de passe"
        />
        {/* Ajoutez ceci avant le bouton pour afficher le message de succès */}
      {successMessage && (
        <Alert severity="success" style={{ marginBottom: "10px" }}>
          {successMessage}
        </Alert>
      )}
      
      {/* Ajoutez ceci avant le bouton pour afficher le message d'erreur */}
      {errorMessage && (
        <Alert severity="error" style={{ marginBottom: "10px" }}>
          {errorMessage}
        </Alert>
      )}
        <Button type="submit" fullWidth variant="contained" color="primary">
          Se connecter
        </Button>
      </form>
    </Container>
  );
}

export default LoginPage;
