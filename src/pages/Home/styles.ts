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

  h2 {
    margin-bottom: 0.5rem;
  }

  ${breakpoints.greaterThan('sm')`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin-bottom: 0;
    }
  `}
`;
