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

const CircularImage = css`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 0.1rem solid black;
`;

const ProfilePicture = ({ img }) => {
  return (
    <div
      css={css`
        justify-content: center;
        align-items: center;
        align-content: center;
        display: flex;
        margin: 10px;
      `}
    >
      <img css={CircularImage} src={img} />
    </div>
  );
};

export const Profile = () => {
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
          max-height: 400px;
          overflow-y: scroll;
          width: 80%;
        `}
      >
        <ProfilePicture img={currentUser.user_metadata.picture} />
        <text
          css={css`
            ${typography.h3}
            padding: 10px;
            width: 100%;
            display: flex;
            border-bottom: 0.1rem solid black;
            justify-content: center;
          `}
        >
          {" "}
          {currentUser.user_metadata.name}
        </text>
      </div>
    </div>
  );
};

export default Profile;
