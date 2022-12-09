import { css } from '@emotion/react';

import { variables } from './variables';
import reset from './reset';

const globalStyles = css`
  /* Global CSS Variables */
  ${variables}

  /* CSS Reset */
  ${reset}

  /* Common Styles */
  *, *:before, *:after {
    box-sizing: border-box;
  }
  *:focus {
    outline: none; /* Webkit, Safari */
  }
  html {
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    background-color: rgb(var(--background));
    line-height: normal;
    overflow-y: scroll;
  }
  body,
  input,
  textarea,
  select,
  button {
    font-family: var(--family);
    font-size: var(--base);
    color: rgb(var(--text));
  }
  a {
    font-family: var(--family);
    font-size: var(--base);
    color: rgb(var(--primary));
  }
  button,
  input {
    padding: 0;
    border: 0;
  }
  button {
    background-color: transparent;
    cursor: pointer;
    outline: none;
    appearance: none;
  }
  img {
    vertical-align: bottom;
    object-fit: cover;
  }
  a {
    text-decoration: none;
    cursor: pointer;
  }
  html,
  body {
    height: 100%;
  }
  #__next {
    min-height: 100%;
    flex: 1;
  }
  #__next,
  #modal,
  header,
  main,
  footer,
  article,
  nav,
  section {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-shrink: 0;
  }

  .link {
    color: rgb(var(--primary));
    text-decoration: underline;
  }
  .invert {
    filter: var(--invert);
  }
  .underline {
    text-decoration: underline;
  }

  /* Custom Antd */
  .ant-form {
    .ant-form-item {
      :last-of-type {
        margin-bottom: 0;
      }
      @media only screen and (max-width: 1025px) {
        margin-bottom: 12px;
      }
    }
    .ant-form-item-label {
      margin: 0;
      padding: 0;
      font-weight: 500;
    }
  }
  .ant-descriptions {
    .ant-descriptions-item-label {
      font-weight: 500;
    }
  }
  .ant-menu-inline {
    border-right: 0;
  }
  .img-crop-control {
    display: flex !important;
    flex-direction: row !important;
  }

  .header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    padding: 0 24px 0 16px !important;
    width: 100%;
    height: 48px !important;
    line-height: 48px !important;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    z-index: 9;
  }
  .sider {
    position: sticky !important;
    top: 48px;
    left: 0;
    overflow: auto;
    height: calc(100vh - 48px);
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    z-index: 8;
  }
  .content {
    padding: 48px 24px 24px 24px;
    z-index: 7;
  }
  .footer {
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
  }
`;

export default globalStyles;
