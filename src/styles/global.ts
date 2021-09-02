import { createGlobalStyle } from 'styled-components';

import breakpoints from './breakpoints';

export default createGlobalStyle`
  html {
    ${breakpoints.greaterThan('md')`
      font-size: 18px;
    `}

    ${breakpoints.greaterThan('lg')`
      font-size: 20px;
    `}

    ${breakpoints.greaterThan('xl')`
      font-size: 22px;
    `}
  }

  body {
    background-color: ${({ theme }) => theme.gray[300]};
  }
`;
