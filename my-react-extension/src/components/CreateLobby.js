/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import SiteListForm from "./SiteListForm";
import "./buttons.css";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";

const MainDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  margin: 20px;
  height: 400px;
`;

const SingleCharacter = ({ char }) => {
  return (
    <span
      css={css`
        ${typography.h2}
        margin: 5px;
      `}
    >
      {char}
    </span>
  );
};

const CreateLobby = () => {
  const navigate = useNavigate();
  const [lobbyHash, setLobbyHash] = useState("");
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);

  const getLobby = async () => {
    const queryParams = new URLSearchParams({
      user_email: currentUser.email,
    });

    const response = await fetch("http://127.0.0.1:5000/lobby?" + queryParams, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        setLobbyHash(data.data.lobby_hash);
      });
  };

  useEffect(() => {
    getLobby();
  }, []);

  return (
    <div css={MainDiv}>
      <div
        css={css`
          margin: 20px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
        `}
      >
        <text css={typography.h2}> ~ Lobby Created ~</text>
      </div>
      <div
        css={css`
          margin: 15px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
        `}
      >
        <text css={typography.muted}>
          Share this lobby code with the other anti-partiers you want in your
          clique.
        </text>
      </div>
      <div
        css={css`
          margin: 5px;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        `}
      >
        {lobbyHash.split("").map((char, index) => (
          <SingleCharacter key={index} char={char} />
        ))}
      </div>
    </div>
  );
};

export default CreateLobby;
