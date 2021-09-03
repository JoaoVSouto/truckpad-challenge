import styled from 'styled-components';
import { Space as AntdSpace } from 'antd';

import breakpoints from 'styles/breakpoints';

export const Space = styled(AntdSpace)`
  width: 100%;
  flex-direction: column;
  gap: 0 !important;

  .ant-space-item {
    width: 100%;
  }

  .ant-space-item .ant-form-item {
    margin-bottom: 16px;
  }

  ${breakpoints.greaterThan('sm')`
    flex-direction: row;
    gap: 8px !important;

    .ant-space-item {
      width: unset;
    }

    .ant-space-item:first-child {
      flex: 1;
    }

    .ant-space-item .ant-form-item {
      margin-bottom: 24px;
    }
  `}
`;

export const HalvedSpace = styled(Space)`
  ${breakpoints.greaterThan('sm')`
    .ant-space-item {
      flex: 1;
    }
  `}
`;

export const ThirdSpace = styled(Space)`
  ${breakpoints.greaterThan('sm')`
    .ant-space-item {
      flex: 1;
    }

    .ant-space-item:first-child {
      flex: 2;
    }
  `}
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
