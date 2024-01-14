/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import SiteListForm from "./SiteListForm";
import cslFuncs from "./cslFuncs";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { useNavigate } from "react-router-dom";
import { getData } from "./Authenticate";

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

  useEffect(() => {
    const getLobby = async () => {
      let lobby = await getData("lobby");
      if (lobby && lobby["id"]) {
        console.log(`found lobby`);
        navigate("/profile");
        return;
      }
    };

    getLobby();
  }, []);

  const handleCreateClick = () => {
    navigate("/add_sites");
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
