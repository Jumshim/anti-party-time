/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import SiteListForm from "./SiteListForm";
import "./buttons.css";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { useNavigate } from "react-router-dom";
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
  const [lobbyHash, setLobbyHash] = useState("");
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);
  const [siteList, setSiteList] = useState([]);

  const getLobby = async () => {
    const queryParams = {
      user_email: currentUser.email,
      sites: ["instagram", "youtube"]
    };

    const response = await fetch("http://127.0.0.1:5000/createlobby?", {
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
        setLobbyHash(data.data.lobby_hash);
      });
  };

  const getSites = async (lobbyKey) => {
    const queryParams = new URLSearchParams({
        hash: lobbyKey //place holder for lobby hash
    });

    const response = await fetch("http://127.0.0.1:5000/getsites?" + queryParams, {
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
        console.log("data: ", data)
        setSiteList(data?.data?.siteList);
      });
  };

  const initWebsites = (lobbyKey) => {
    const response = getSites(lobbyKey);
    const websites = siteList; //note*** replace with post call to get websites with lobbyKey
    const webDict = {};

    console.log("CREATELOBBY: ", websites)

    websites.forEach((website) => {
      webDict[website] = 0;
    });

    cslFuncs.initialize("sites", webDict);
  };

  useEffect(() => {
    getLobby();
    initWebsites(lobbyHash);
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
