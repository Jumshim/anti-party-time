/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const fonts = {
  mono: "monospace, monospace",
};

export const typography = {
  h1: css`
    font-family: ${fonts.mono};
    font-size: 1.6rem; // Example size, adjust as needed
    font-weight: bold;
  `,
  h2: css`
    font-family: ${fonts.mono};
    font-size: 1.3rem;
    font-weight: bold;
  `,
  h3: css`
    font-family: ${fonts.mono};
    font-size: 1.1rem;
    font-weight: normal;
  `,
  h4: css`
    font-family: ${fonts.mono};
    font-size: 1rem;
    font-weight: normal;
  `,
  p: css`
    font-family: ${fonts.mono};
    font-size: 0.8rem;
    line-height: 1.5;
  `,
  large: css`
    font-family: ${fonts.mono};
    font-size: 1.25rem;
  `,
  small: css`
    font-family: ${fonts.mono};
    font-size: 0.875rem;
  `,
  muted: css`
    font-family: ${fonts.mono};
    font-size: 0.7rem;
    color: #6c757d;
  `,
};
