/** @jsxImportSource @emotion/react */
import { typography } from "./typography";
import { css } from "@emotion/react";

export const buttonStyles = {
  default: css`
    ${typography.p}
    padding: 8px 16px;
    border-radius: 16px;
    border: none;
    background-color: #0f172a;
    color: #f1f5f9;
    &:hover {
      background-color: #475569;
      color: #cbd5e1;
    }
  `,
  secondary: css`
    ${typography.p}
    padding: 8px 16px;
    border-radius: 16px;
    border: none;
    background-color: #475569;
    color: #cbd5e1;
    &:hover {
      background-color: #0f172a;
      color: #f1f5f9;
    }
  `,
  outline: css`
    ${typography.p}
    padding: 8px 16px;
    border-radius: 16px;
    border: 1rem solid #0f172a;
    background-color: #f1f5f9;
    color: #0f172a;
    &:hover {
      background-color: #f1f5f9;
      color: #0f172a;
    }
  `,
};
