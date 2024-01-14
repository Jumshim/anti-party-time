/** @jsxImportSource @emotion/react */

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../assets/js/UserContext";
import HasLobby from "./HasLobby";
import Login from "./Login";
import NoLobby from "./NoLobby";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { useNavigate } from "react-router-dom";

const MainDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  height: 400px;
`;

const STORAGE = chrome.storage.local;

export const getData = (key) => {
  return new Promise((resolve) => {
    STORAGE.get(key, (result) =>
      result[key] ? resolve(result[key]) : resolve({})
    );
  });
};

export default function Authenticate() {
  const { currentUser, accessToken, isAuthCheckComplete, lobby } =
    useContext(UserContext);
  const [hasLobby, setHasLobby] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLobby = async () => {
      let lobby = await getData("lobby");
      if (lobby && lobby["id"]) {
        setHasLobby(true);
        return;
      }
    };

    const checkUser = async () => {
      await checkLobby(); // Only check for lobby if user is logged in
    };

    checkUser();
  }, [currentUser, accessToken]);

  if (!isAuthCheckComplete) {
    return (
      <div
        css={css`
          ${MainDiv} ${typography.h1} align-content: center;
        `}
      >
        Loading...
      </div>
    );
  }
  if (!currentUser && !accessToken && isAuthCheckComplete) {
    return (
      <div css={MainDiv}>
        <text css={typography.h1}>🎉 Anti-Party-Time 🎉</text> <break />
        <text
          css={css`
            ${typography.muted} padding: 30px;
            text-align: center;
          `}
        >
          {" "}
          Thank you for deciding to join the anti-party! Please login to unlock
          all of our features
        </text>
        <Login />
      </div>
    );
  } else {
    navigate("/no_lobby");
    return <div />;
  }
}
