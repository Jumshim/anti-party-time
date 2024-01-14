/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";
import cslFuncs from "./cslFuncs";
import { backIconSVG } from "../assets/js/icons";

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
  const [lobbyCreated, setLobbyCreated] = useState(false);
  const [lobbyHash, setLobbyHash] = useState("");
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);
  const [siteList, setSiteList] = useState([]);

  const getLobby = async () => {
    const queryParams = {
      user_email: currentUser.email,
      sites: siteList,
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
        setLobbyHash(data.data.lobby_hash);
      });
  };

  useEffect(() => {
    const newSiteList = location.state?.sites;
    if (newSiteList && newSiteList.length > 0) {
      setSiteList(newSiteList);
    }
  }, [location.state?.sites]);

  useEffect(() => {
    if (siteList.length > 0) {
      getLobby()
        .then((lobbyResponse) => {
          return lobbyResponse?.data?.lobby_hash;
        })
        .then((lobbyHash) => {
          getSites(lobbyHash);
        })
        .then((sitesResponse) => {
          InitWebsites(sitesResponse?.data);
        });
    }
  }, [siteList]);

  const getSites = async (lobbyKey) => {
    const queryParams = new URLSearchParams({
      hash: lobbyKey, //place holder for lobby hash
    });

    const response = await fetch(
      "http://127.0.0.1:5000/getsites?" + queryParams,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch lobby. Status: ${response.status}`);
    }

    const data = await response.json();
    setSiteList(data?.data?.siteList);
    return data;
  };

  const InitWebsites = (siteList) => {
    let websites = siteList;
    //note*** replace with post call to get websites with lobbyKey
    const webDict = {};

    console.log("CREATELOBBY: ", websites);

    websites.forEach((website) => {
      webDict[website] = 0;
    });

    console.log(webDict);

    cslFuncs.initialize("sites", webDict);
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
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            margin: 5px;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            align-content: center;
          `}
        >
          {lobbyHash.split("").map((char, index) => (
            <SingleCharacter key={index} char={char} />
          ))}
        </div>
        {lobbyCreated ? (
          <Link
            css={css`
              ${buttonStyles.outline}
              text-align: center;
              margin: 20px;
            `}
            to="/profile"
          >
            Go to Profile
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default CreateLobby;
