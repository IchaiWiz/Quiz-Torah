import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';


const drawerWidth = 240;
const MyDrawer = (props) => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { isAuthenticated, logout, username } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    handleDialogClose();
    // Ajoutez ici la logique pour déconnecter l'utilisateur
  };

  const drawer = (
    <Box display="flex" flexDirection="column" height="100%">
      <List>
        {isAuthenticated ? (
          [
            { text: username || 'Profil', icon: <AccountCircleIcon />, path: '/profil' },
            { text: 'Tableau de classement', icon: <BarChartIcon /> },
            { text: 'À propos', icon: <InfoIcon /> },
            { text: 'Paramètres', icon: <SettingsIcon /> }
            
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          [
            { text: 'Inscription', icon: <PersonAddIcon />, path: '/signup' },
            { text: 'Connexion', icon: <LoginIcon />, path: '/login' },
            { text: 'À propos', icon: <InfoIcon /> },
            { text: 'Paramètres', icon: <SettingsIcon /> }
            
          ].map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
      {isAuthenticated && (
        <Box marginTop="auto">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDialogOpen}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Déconnexion" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
      >
        <DialogTitle>{"Voulez-vous vraiment vous déconnecter ?"}</DialogTitle>
        <DialogContentText style={{ margin: '0 24px 24px' }}>
          En vous déconnectant, vous devrez entrer à nouveau vos identifiants pour accéder à votre compte.
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Déconnexion
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
);



  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      >
        <ManageAccountsIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </React.Fragment>
  );
}

MyDrawer.propTypes = {
  window: PropTypes.func,
};

export default MyDrawer;
