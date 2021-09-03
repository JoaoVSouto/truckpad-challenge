import styled from 'styled-components';
import { DatePicker as AntdDatePicker, Space as AntdSpace, Button } from 'antd';

import breakpoints from 'styles/breakpoints';

export const DatePicker = styled(AntdDatePicker)`
  width: 100%;
`;

export const Space = styled(AntdSpace)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
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

export const NextButton = styled(Button)`
  margin-left: auto;
  display: block;
`;
