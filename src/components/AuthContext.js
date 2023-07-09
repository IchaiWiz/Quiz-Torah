import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  const [first_Name, setFirstName] = useState(null);
  const [last_Name, setLastName] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username"); // Récupération du nom d'utilisateur
    const storedTimestamp = localStorage.getItem("created_at");
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("id");
    const storedFirstName = localStorage.getItem("first_Name");
    const storedLastName = localStorage.getItem("last_Name");

    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername); // Définition du nom d'utilisateur dans l'état
      setTimestamp(storedTimestamp);
      setEmail(storedEmail);
      setId(storedId);
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, []);

  const login = (token, username, timestamp, email, id, first_Name, last_Name) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("created_at", timestamp); // assurez-vous que timestamp est une valeur de date valide
    localStorage.setItem("email", email);
    localStorage.setItem("id", id);
    localStorage.setItem("first_Name", first_Name);
    localStorage.setItem("last_Name", last_Name);
    setIsAuthenticated(true);
    setUsername(username);
    setId(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("created_at");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("first_Name");
    localStorage.removeItem("last_Name");
    setIsAuthenticated(false);
    setUsername(null);
    setId(null);
  };

  const updateUser = (newData) => {
    const { email, first_Name, last_Name, username } = newData;
      
    // Mise à jour du stockage local et de l'état
    if (username) {
      localStorage.setItem("username", username);
      setUsername(username);
    }
    if (email) {
      localStorage.setItem("email", email);
      setEmail(email);
    }
    if (first_Name) {
      localStorage.setItem("first_Name", first_Name);
      setFirstName(first_Name);
    }
    if (last_Name) {
      localStorage.setItem("last_Name", last_Name);
      setLastName(last_Name);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, timestamp, email, id, first_Name, last_Name, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
