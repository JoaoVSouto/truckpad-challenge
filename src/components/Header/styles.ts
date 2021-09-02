import styled from 'styled-components';

import container from 'styles/mixins/container';

export const Header = styled.header`
  background-color: ${({ theme }) => theme.gray[800]};
  padding: 1rem 0;
`;

export const Container = styled.div`
  ${container}

  img {
    width: 9.125rem;
    height: auto;
  }
`;
