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

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lobbyCreated, setLobbyCreated] = useState(false);
  const [lobbyHash, setLobbyHash] = useState("");
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);
  const [siteList, setSiteList] = useState([]);

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
        <text css={typography.h2}> ~ Profile ~</text>
      </div>
    </div>
  );
};

export default Profile;
