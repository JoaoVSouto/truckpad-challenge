import logoImg from 'assets/img/truckpad-logo-negativo.svg';

import * as S from './styles';

export function Header() {
  return (
    <S.Header>
      <S.Container>
        <img src={logoImg} alt="Truckpad" />
      </S.Container>
    </S.Header>
  );
}
