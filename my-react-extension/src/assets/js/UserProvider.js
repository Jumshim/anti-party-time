import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getCurrentLobby, getCurrentUser } from "../../components/Login";

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [lobby, setLobby] = useState("");
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
    // getCurrentLobby().then((resp) => {
    //   setLobby(resp.lobbyHash);
    // });
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
