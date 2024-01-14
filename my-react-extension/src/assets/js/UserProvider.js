import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getCurrentUser } from "../../Login";

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    getCurrentUser().then((resp) => {
      if (resp) {
        setCurrentUser(resp.user);
        setAccessToken(resp.accessToken);
      } else {
        console.log("user is not found");
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, accessToken, setAccessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
