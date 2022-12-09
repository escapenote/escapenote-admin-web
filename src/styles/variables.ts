import { css } from '@emotion/react';

export const primaryColor = '255, 103, 46';

export const variables = css`
  :root {
    --family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
      Arial, sans-serif;
    --xsmall: 10px;
    --small: 12px;
    --base: 14px;
    --large: 16px;
    --xlarge: 20px;
    --xxlarge: 24px;
    --xxxlarge: 30px;

    --primary: ${primaryColor};
    --text: 23, 23, 37;
    --textR: 250, 250, 251;
    --content: 255, 255, 255;
    --contentR: 28, 28, 36;
    --background: 240, 240, 240;
    --backgroundR: 19, 19, 26;
    --border: 219, 219, 219;
    --hover: 250, 250, 250;
    --shadow: 238, 238, 238;
    --gray: 156, 156, 156;
    --invert: invert(0);
  }
`;

export default variables;
