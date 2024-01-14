/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";
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

let lobbyKey = await getData("lobby")
console.log("lobbyKey: ", lobbyKey["id"])

export const Ranking = () => {
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);

  const navigate = useNavigate();

  const getRanking = async () => {
    const queryParams = new URLSearchParams({
      "hash": lobbyKey["id"]
    });

    console.log(JSON.stringify(queryParams))

    const response = fetch("http://127.0.0.1:5000/tracklobby?" + queryParams, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(`response fetched: ${JSON.stringify(response)}`);
        return response?.json();
      })
      .then((data) => {
        console.log("Data:", data)
      });
  };

  useEffect(() => {
    getRanking();
  });

  return (
    <div css={MainDiv}>
      <div
        css={css`
          margin: 20px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
          max-height: 400px;
          overflow-y: scroll;
          width: 80%;
        `}
      >
        <text
          css={css`
            ${typography.h1}
            padding: 10px;
            width: 100%;
            display: flex;
            border-bottom: 0.1rem solid black;
            justify-content: center;
          `}
        >
          👑 Ranking
        </text>
      </div>
    </div>
  );
};

export default Ranking;
