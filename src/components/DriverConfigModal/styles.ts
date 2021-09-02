import styled from 'styled-components';
import { DatePicker as AntdDatePicker } from 'antd';

export const Container = styled.div`
  padding-top: 1rem;
`;

export const FormContainer = styled.div`
  margin-top: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`;

export const DatePicker = styled(AntdDatePicker)`
  flex: 1;
`;
