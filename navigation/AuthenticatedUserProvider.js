import React, { useState, createContext } from "react";

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <AuthenticatedUserContext.Provider
      value={{ user, setUser, selectedRestaurant, setSelectedRestaurant }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
