/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";
import cslFuncs from "./cslFuncs";
import { backIconSVG } from "../assets/js/icons";
import { initLobby } from "../display";

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


const JoinLobby = () => {
  const navigate = useNavigate();
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);
  const [inputValue, setInputValue] = useState("");
  const [siteList, setSiteList] = useState([]);

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
      if (!response.ok) {
        throw new Error(`Failed to fetch lobby. Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("data: ", data?.data)
      setSiteList(data?.data);
      return data;
  };
  
  const InitWebsites = () => {
    let websites = siteList;
    //note*** replace with post call to get websites with lobbyKey
    const webDict = {};
  
    console.log("CREATELOBBY: ", websites)
  
    websites.forEach((website) => {
      webDict[website] = 0;
    });
  
    console.log(webDict);
  
    cslFuncs.initialize("sites", webDict);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const joinLobby = async () => {
    const queryParams = {
      hash: inputValue,
      user_email: currentUser.email,
    };

    const response = await fetch("http://127.0.0.1:5000/joinlobby", {
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
        // setLobbyHash(data.data.lobby_hash);
        initLobby(inputValue);
        navigate("/profile");
      });
  };

  useEffect (() => {
    const fetchData = async () => {
      try {

        if (inputValue) {
          const sitesResponse = await getSites(inputValue);
          console.log('Sites Response:', sitesResponse);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [inputValue]);

  useEffect (() => {
    const fetchData = async () => {
      try {

        if (siteList) {
          InitWebsites(siteList);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [siteList]);

  return (
    <div css={MainDiv}>
      <Link
        css={css`
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: flex-start;
        `}
        to="/no_lobby"
      >
        {backIconSVG}
      </Link>
      <div
        css={css`
          margin: 20px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
        `}
      >
        <text css={typography.h2}> ~ Join Lobby ~</text>
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
          Input a lobby code to join the other anti-partiers. They await you...
        </text>
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter 6-Character Code"
        css={css`
          ${typography.small}
          flex;
          height: 2.25rem;
          width: 70%;
          border-radius: 0.375rem;
          border: 1px solid #0f172a;
          padding: 0.25rem 0.75rem;
          background-color: transparent;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          margin: 20px;
        `}
      />
      <text
        css={css`
          ${typography.muted}
          padding: 10px;
        `}
      >
        Please submit your given code!
      </text>
      <button
        css={css`
          ${buttonStyles.default} margin: 20px;
        `}
        onClick={joinLobby}
      >
        Submit
      </button>
    </div>
  );
};

export default JoinLobby;
