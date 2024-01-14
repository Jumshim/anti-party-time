/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import SiteListForm from "./SiteListForm";
import cslFuncs from "./cslFuncs";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { useNavigate } from "react-router-dom";

const MainDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  margin: 20px;
  height: 400px;
`;

const NoLobby = () => {
  const navigate = useNavigate();

  //   const getSites = async (lobbyKey) => {
  //     const queryParams = new URLSearchParams({
  //         hash: "000000" //place holder for lobby hash
  //     });

  //     const response = await fetch("http://127.0.0.1:5000/getsites?" + queryParams, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((response) => {
  //         return response?.json();
  //       })
  //       .then((data) => {
  //         return (data.data.siteList);
  //       });
  //   };

  //   const initWebsites = (lobbyKey) => {
  //     const websites = getSites(lobbyKey)
  //     //const websites = ["youtube", "facebook", "instagram"]; //note*** replace with post call to get websites with lobbyKey
  //     const webDict = {};

  //     websites.forEach((website) => {
  //       webDict[website] = 0;
  //     });

  //     cslFuncs.initialize("sites", webDict);
  //   };

  const handleCreateClick = () => {
    navigate("/create_lobby");
  };

  const handleJoinClick = () => {
    navigate("/join_lobby");
  };

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
        <text css={typography.h2}> Where's your Anti-Party? 🧐</text>
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
          Create or join a lobby to create an anti-party
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
        <button
          css={css`
            ${buttonStyles.default} margin: 10px;
          `}
          onClick={handleCreateClick}
        >
          Create Lobby
        </button>
        <button
          css={css`
            ${buttonStyles.default} margin: 10px;
          `}
          onClick={handleJoinClick}
        >
          Join Lobby
        </button>
      </div>
    </div>
  );
};

export default NoLobby;
