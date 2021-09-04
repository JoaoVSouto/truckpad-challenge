import styled from 'styled-components';

import breakpoints from 'styles/breakpoints';
import container from 'styles/mixins/container';

export const Container = styled.main`
  ${container}

  margin-top: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 1rem;

  .ant-typography {
    margin-bottom: 0.5rem;
  }

  ${breakpoints.greaterThan('sm')`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .ant-typography {
      margin-bottom: 0;
    }
  `}
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  .ant-spin {
    margin: 0 1rem;
  }

  ${breakpoints.greaterThan('md')`
    align-items: baseline;
  `}
`;
