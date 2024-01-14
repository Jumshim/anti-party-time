/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { useNavigate, useLocation, Link } from "react-router-dom";
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

export const Ranking = () => {
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {});

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
          Ranking
        </text>
      </div>
    </div>
  );
};

export default Ranking;
