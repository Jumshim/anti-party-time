/** @jsxImportSource @emotion/react */

import React, { useContext, useState, useEffect } from "react";
import { css } from "@emotion/react";
import { typography } from "../assets/js/typography";
import { buttonStyles } from "../assets/js/button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../assets/js/UserContext";
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

const AddSites = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      setSites([inputValue, ...sites]);
      setInputValue("");
    }
  };

  const onClick = () => {
    navigate("/create_lobby", { state: { sites: sites } });
  };

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
      <text
        css={css`
          ${typography.h4}
          padding: 5px;
        `}
      >
        Add your sites!
      </text>
      <hr />
      <div
        css={css`
          height: 200px;
          max-height: 200px;
          width: 100%;
          overflow-y: scroll;
        `}
      >
        {sites.map((site, index) => (
          <text
            css={css`
              ${typography.p}
              display: flex;
              flex-direction: column;
              border-bottom: 1px solid black;
              margin: 2px 5px 2px 5px;
              width: 100%;
              padding: 5px;
            `}
            key={index}
          >
            {site}
          </text>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputEnter}
        placeholder="Enter website hostname"
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
        Press 'Enter' to add a site. Press 'Submit' when you're done.
      </text>
      <button
        css={css`
          ${buttonStyles.default} margin: 20px;
        `}
        onClick={onClick}
      >
        Submit
      </button>
    </div>
  );
};

export default AddSites;
