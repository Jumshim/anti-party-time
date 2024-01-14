/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";
import cslFuncs from "./cslFuncs";

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
  const location = useLocation();
  const [lobbyHash, setLobbyHash] = useState("");
  const [sites, setSites] = useState([]);
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);
  const [siteList, setSiteList] = useState([]);

  const getLobby = async () => {
    console.log(
      `getting lobby with user_email: ${currentUser.email}, sites: ${sites}`
    );
    const queryParams = {
      user_email: currentUser.email,
      sites: sites,
    };

    const response = fetch("http://127.0.0.1:5000/createlobby", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),
    })
      .then((response) => {
        return response?.json();
      })
      .then((data) => {
        console.log(`setting lobby hash`);
        setLobbyHash(data.data.lobby_hash);
        console.log(`access token: ${accessToken}`);
      });
  };

  useEffect(() => {
    setSiteList(location.state?.sites).then(() => {
      getLobby();
    });
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
