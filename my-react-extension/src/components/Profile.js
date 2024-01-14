/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";
import { removeLobby } from "./Authenticate";
import { getData } from "../display";
import { buttonStyles } from "../assets/js/button";

const MainDiv = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-content: center;
  margin: 20px;
  height: 400px;
  max-height: 400px;
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

const calculateTimes = (initSites) => {
  const totalSeconds = Object.values(initSites).reduce(
    (total, seconds) => total + seconds,
    0
  );
  return totalSeconds;
};

const IndividualTime = ({ domain, seconds, totalSeconds }) => {
  const ratio = (seconds / totalSeconds) * 100;
  const barStyle = css`
    width: ${ratio + 2}%;
    background-color: #ba3c3c;
    height: 5px;
    margin: 3px 10px;
    border-radius: 15px;
  `;

  console.log(
    `individual time for: ${domain}, ${seconds}, ${totalSeconds}, ratio: ${ratio}`
  );

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
      `}
    >
      <p
        css={css`
          ${typography.small}
          flex: 0.25
        `}
      >
        {domain}:{" "}
      </p>
      <div
        css={css`
          width: 200px;
          justify-content: flex-start;
        `}
      >
        <div css={barStyle} />
      </div>

      <p
        css={css`
          ${typography.muted}
          flex: 0.25;
        `}
      >
        {seconds > 100
          ? `~${Math.round((seconds / 60) * 2) / 2} minutes`
          : `~${seconds} seconds`}
      </p>
    </div>
  );
};

export const Profile = () => {
  const { currentUser, accessToken, isAuthCheckComplete, lobby, signOut } =
    useContext(UserContext);

  const navigate = useNavigate();
  const [initSites, setInitSites] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fetchScreenTime = async () => {
      const initSites = await getData("sites");
      setInitSites(initSites);
      console.log(`initSites: ${JSON.stringify(initSites)}`);
      console.log(`Object.entries(initSites): ${Object.entries(initSites)}`);
      setTime(calculateTimes(initSites));
    };
    fetchScreenTime();
  }, []);

  const onSignOut = () => {
    removeLobby();
    signOut();
    navigate("/");
  };

  const onRemoveLobby = () => {
    removeLobby();
    navigate("/no_lobby");
  };

  return (
    <div css={MainDiv}>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin: 2px;
          justify-content: space-evenly;
          width: 100%;
        `}
      >
        <button css={buttonStyles.outline} onClick={onSignOut}>
          Sign Out
        </button>
        <button css={buttonStyles.outline} onClick={onRemoveLobby}>
          Remove Lobby
        </button>
      </div>
      <div
        css={css`
          margin: 20px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
          max-height: 400px;
          width: 90%;
          flex-direction: column;
        `}
      >
        <ProfilePicture img={currentUser.user_metadata.picture} />
        <text
          css={css`
            ${typography.h3}
            padding: 5px;
            width: 100%;
            display: flex;
            justify-content: center;
          `}
        >
          {" "}
          {currentUser.user_metadata.name}
        </text>
        <text
          css={css`
            ${typography.muted}
            padding: 3px;
            width: 100%;
            display: flex;
            justify-content: center;
          `}
        >
          Lobby: {lobby}
        </text>
        <text
          css={css`
            ${typography.muted}
            padding: 3px;
            width: 100%;
            display: flex;
            justify-content: center;
            border-bottom: 0.1rem solid black;
          `}
        >
          {/* {Math.round((time / 60) * 2) / 2 */}
          {time > 300
            ? `Total time partying 😔: ~${
                Math.round((time / 60) * 2) / 2
              } minutes`
            : `Total time partying 😔: ~${time} seconds`}
        </text>
      </div>
      <div
        css={css`
          max-height: 200px;
          height: 200px;
          overflow-y: scroll;
        `}
      >
        {Object.entries(initSites)
          .sort(([, secondsA], [, secondsB]) => secondsB - secondsA)
          .map(([domain, seconds], index) => (
            <IndividualTime
              key={index}
              domain={domain}
              seconds={seconds}
              totalSeconds={time}
            />
          ))}
      </div>

      <Link css={buttonStyles.default} to="/ranking">
        Rankings
      </Link>
    </div>
  );
};

export default Profile;
