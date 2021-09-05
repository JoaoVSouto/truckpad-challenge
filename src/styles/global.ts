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

  .ant-pagination-item-active {
    &:hover,
    &:focus {
      background-color: transparent;

      a {
        color: ${({ theme }) => theme.yellow[500]};
      }
    }

    a {
      color: ${({ theme }) => theme.gray[800]};
    }
  }

  .ant-table-wrapper .ant-spin-dot-item {
    background-color: ${({ theme }) => theme.gray[800]};
  }
`;
