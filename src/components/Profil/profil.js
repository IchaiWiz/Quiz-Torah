import { useState, useContext } from "react";
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  Badge,
  Alert,
} from "@mui/material";
import { Snackbar } from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../AuthContext";

const Profil = () => {
  const { username, timestamp, email, last_Name, first_Name, updateUser } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [countdownDialogOpen, setCountdownDialogOpen] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null); // Ajouter cet état

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setDeleteDialogOpen(false);
    setCountdown(5); // Changer le compte à rebours pour 10 secondes
    setCountdownDialogOpen(true);
  
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);
    setIntervalId(interval);
  
    const timeout = setTimeout(async () => {
      clearInterval(interval);
      setCountdownDialogOpen(false);
  
      // Call the API to delete the user account
      try {
        const userId = localStorage.getItem('id');
        console.log("Deleting user with ID: ", userId);
        const response = await fetch(`http://localhost:5000/delete-user?userId=${userId}`, { // Sending userId as a query parameter
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
  
        console.log("Compte supprimé.");
        // Clear all data from local storage
        localStorage.clear();
  
        // Wait for 10 seconds before redirecting the user to the homepage
        setTimeout(() => {
          window.location.href = "/";
        }, 5000); // Waiting for 10 seconds
  
      } catch (error) {
        console.error("Error deleting user account", error);
        // Optionally, you can display an error message to the user
      }
    }, 5000);
  
    setTimeoutId(timeout);
  };
  

  const handleCancelCountdown = () => {
    // Arrêtez le compte à rebours en effaçant l'intervalle
    clearInterval(intervalId);
    // Arrêter la minuterie de suppression
    clearTimeout(timeoutId); // Arrêter la minuterie
    // Fermez la boîte de dialogue de compte à rebours
    setCountdownDialogOpen(false);
  };


  const handleSaveChanges = () => {
    const userId = localStorage.getItem("id");
    const apiUrl = "http://localhost:5000/update-user";

    // Ne pas mettre à jour si les champs sont vides
    const payload = { userId };
    if (newUsername) payload.newUsername = newUsername;
    if (newEmail) payload.newEmail = newEmail;
    if (newFirstName) payload.newFirstName = newFirstName;
    if (newLastName) payload.newLastName = newLastName;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        newUsername,
        newEmail,
        newFirstName,
        newLastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsEditing(false);
        updateUser({
          username: newUsername,
          email: newEmail,
          first_Name: newFirstName,
          last_Name: newLastName,
        });
        setAlertMessage(
          "Les informations de l'utilisateur ont été mises à jour avec succès!"
        );
        setAlertType("success");
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertMessage(
          "Une erreur s'est produite lors de la mise à jour des informations de l'utilisateur."
        );
        setAlertType("error");
      });
  };

  // Simulated data
  const userData = {
    username: username,
    memberSince: timestamp ? new Date(timestamp).toLocaleDateString() : "N/A",
    first_Name: first_Name,
    last_Name: last_Name,
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ backgroundColor: "#f5f5f5", p: 3, mb: 3 }} elevation={2}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Badge
              color="secondary"
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              badgeContent={
                <EditTwoToneIcon
                  color="primary"
                  // je veuw que le curseur soit une main
                  sx={{ width: 20, height: 20, cursor: "pointer" }}
                  onClick={() => {
                    // code pour gérer la modification de l'avatar
                  }}
                />
              }
              sx={{
                ".MuiBadge-badge": {
                  // Cibler spécifiquement la classe du contenu du badge.
                  borderRadius: "50%", // Rendre le contour du badge rond.
                  marginTop: "-7px",
                  marginRight: "-7px",
                },
              }}
            >
              <Avatar sx={{ width: 64, height: 64 }}>
                <AccountCircleIcon fontSize="large" />
              </Avatar>
            </Badge>
          </Grid>
          <Grid item>
            <Typography variant="h4">{userData.username}</Typography>
            <Typography variant="body1">
              Membre depuis {userData.memberSince}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <Typography variant="h6">Informations Personnelles</Typography>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">
              <strong>Username:</strong>
            </Typography>
            <Chip label={username || "Pas encore de nom d'utilisateur"} />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">
              <strong>Email:</strong>
            </Typography>
            <Chip label={email || "Pas encore d'email"} color="secondary" />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">
              <strong>Nom:</strong>
            </Typography>
            <Chip label={last_Name || "Pas encore de nom"} color="primary" />
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">
              <strong>Prénom:</strong>
            </Typography>
            <Chip
              label={first_Name || "Pas encore de prénom"}
              color="primary"
            />
          </Box>
          <Snackbar
            open={alertMessage !== ""}
            autoHideDuration={6000}
            onClose={() => setAlertMessage("")}
          >
            <Alert
              onClose={() => setAlertMessage("")}
              severity={alertType}
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
          >
            Modifier les informations
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={isEditing}
        onClose={() => setIsEditing(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ mb: 2 }}>Modifier les informations</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <TextField
            label="Username"
            fullWidth
            defaultValue={username}
            onChange={(e) => setNewUsername(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="First Name"
            fullWidth
            defaultValue={first_Name}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            defaultValue={last_Name}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            defaultValue={email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)} color="warning">
            Annuler
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quiz Stats */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <Typography variant="h6">Statistiques de Quiz</Typography>
        {userData.quizStats ? (
          <div>{/* Display quiz stats here */}</div>
        ) : (
          <Typography>Aucun quiz joué pour le moment.</Typography>
        )}
      </Paper>

      {/* Badges */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <Typography variant="h6">Badges et Récompenses</Typography>
        {userData.badges ? (
          <div>{/* Display badges here */}</div>
        ) : (
          <Typography>
            Aucun badge ou récompense gagné pour le moment.
          </Typography>
        )}
      </Paper>

      {/* Quiz History */}
      <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
        <Typography variant="h6">Historique de Quiz</Typography>
        {userData.quizHistory ? (
          <div>{/* Display quiz history here */}</div>
        ) : (
          <Typography>Aucun historique de quiz pour le moment.</Typography>
        )}
      </Paper>
      <Button variant="contained" color="warning" onClick={openDeleteDialog}>
        Supprimer mon compte
      </Button>

      {/* Dialog pour confirmer la suppression */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Supprimer le compte"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer votre compte? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour le compte à rebours */}
      <Dialog
      open={countdownDialogOpen}
      onClose={handleCancelCountdown} // Modifier ici pour utiliser handleCancelCountdown
      aria-labelledby="countdown-dialog-title"
      aria-describedby="countdown-dialog-description"
    >
      <DialogTitle id="countdown-dialog-title">
        {"Suppression du compte"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="countdown-dialog-description">
          Votre compte sera supprimé dans {countdown} secondes.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelCountdown} color="primary"> {/* Modifier ici pour utiliser handleCancelCountdown */}
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
    </Container>
  );
};

export default Profil;
