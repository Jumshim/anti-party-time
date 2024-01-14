import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import {
  getCurrentLobby,
  getCurrentUser,
  supabase,
} from "../../components/Login";
import cslFuncs from "../../components/cslFuncs";

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
        cslFuncs.initialize("user", resp.user.email);
      } else {
        console.log("user is not found");
      }
      setIsAuthCheckComplete(true);
    });
    // getCurrentLobby().then((resp) => {
    //   setLobby(resp.lobbyHash);
    // });
  }, []);

  const signOut = async () => {
    setCurrentUser(null);
    setAccessToken(null);

    await supabase.auth.signOut();
    chrome.storage.sync.remove(["gauthAccessToken", "gauthRefreshToken"]);
  };

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
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
