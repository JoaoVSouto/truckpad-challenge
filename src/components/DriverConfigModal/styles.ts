import styled from 'styled-components';
import { DatePicker as AntdDatePicker, Space } from 'antd';

import breakpoints from 'styles/breakpoints';

export const Container = styled.div`
  padding-top: 1rem;
`;

export const FormContainer = styled.div`
  margin-top: 1rem;
`;

export const DatePicker = styled(AntdDatePicker)`
  width: 100%;
`;

export const NameBirthdaySpace = styled(Space)`
  width: 100%;
  flex-direction: column;

  .ant-space-item {
    width: 100%;
  }

  .ant-space-item:first-child .ant-form-item {
    margin-bottom: 0;
  }

  ${breakpoints.greaterThan('sm')`
    flex-direction: row;

    .ant-space-item {
      width: unset;
    }

    .ant-space-item:first-child {
      flex: 1;
    }

    .ant-space-item:first-child .ant-form-item {
      margin-bottom: 24px;
    }
  `}
`;
