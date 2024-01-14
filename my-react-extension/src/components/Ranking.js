/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";
import { getData } from "./Authenticate";
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

let lobbyKey = await getData("lobby");
console.log("lobbyKey: ", lobbyKey["id"]);

let email = await getData("user");
console.log("email: ", email);

const RankingItem = ({ email, time }) => {
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
          flex: 0.7;
          justify-content: flex-start;
          padding: 3px;
        `}
      >
        {email}:
      </p>

      <p
        css={css`
          ${typography.muted}
          flex: 0.3;
          justify-content: flex-end;
          padding: 3px;
        `}
      >
        {time > 100
          ? `~${Math.round((time / 60) * 2) / 2} minutes`
          : `~${time} seconds`}
      </p>
    </div>
  );
};

export const Ranking = () => {
  const { currentUser, accessToken, isAuthCheckComplete } =
    useContext(UserContext);
  const [myRanking, setMyRanking] = useState(0);
  const [rankings, setRankings] = useState([]);
  // rankings is [[user_email, total time]]

  const navigate = useNavigate();

  const getMyRank = (data) => {
    let myRank = 0;
    console.log(data.ranking);
    console.log(JSON.stringify(data));
    for (let user in data.ranking) {
      console.log(`user: ${user}`);
      if (data.ranking[user][0] == email) {
        myRank = data.ranking[user][3];
        console.log(data.ranking[user]);
        console.log(myRank);
        setMyRanking(myRank);
        return myRank;
      }
    }
    throw console.error("not found person");
  };

  const getRankings = (data) => {
    let rankings = [];
    for (let user in data.ranking) {
      console.log(`user: ${user}`);
      rankings.push([data.ranking[user][0], data.ranking[user][2]]);
    }

    console.log(rankings);
    setRankings(rankings);
    return rankings;
  };

  const getRanking = async () => {
    const queryParams = new URLSearchParams({
      hash: lobbyKey["id"],
    });

    console.log(JSON.stringify(queryParams));

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
        console.log("Data:", data);
        getMyRank(data.data);
        getRankings(data.data);
      });
  };

  useEffect(() => {
    getRanking();
  });

  return (
    <div css={MainDiv}>
      <Link
        css={css`
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: flex-start;
        `}
        to="/profile"
      >
        {backIconSVG}
      </Link>
      <div
        css={css`
          margin: 20px 10px;
          justify-content: center;
          align-items: center;
          align-content: center;
          max-height: 400px;
          width: 95%;
        `}
      >
        <text
          css={css`
            ${typography.h2}
            padding: 10px;
            width: 100%;
            display: flex;
            border-bottom: 0.1rem solid black;
            justify-content: center;
          `}
        >
          👑 Rankings 👑
        </text>
        <text
          css={css`
            ${typography.muted}
            padding: 3px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            border-bottom: 0.1rem solid black;
          `}
        >
          Your ranking for the day: {myRanking} 🏆
        </text>
        <text
          css={css`
            ${typography.h3}
            padding: 5px;
            width: 100%;
            display: flex;
            justify-content: center;
          `}
        >
          Full Rankings:
        </text>
        {rankings.map((tuple, index) => (
          <RankingItem key={index} email={tuple[0]} time={tuple[1]} />
        ))}
      </div>
    </div>
  );
};

export default Ranking;
