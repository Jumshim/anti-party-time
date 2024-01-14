import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getCurrentUser } from "../../components/Login";

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [lobby, setLobby] = useState(false);
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);

  useEffect(() => {
    getCurrentUser().then((resp) => {
      if (resp) {
        setCurrentUser(resp.user);
        setAccessToken(resp.accessToken);
      } else {
        console.log("user is not found");
      }
      setIsAuthCheckComplete(true);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        accessToken,
        setAccessToken,
        isAuthCheckComplete,
        lobby,
        setLobby,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
