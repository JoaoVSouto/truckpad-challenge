import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/pt_BR';

import { driverStore } from 'store/driver';

import { Home } from 'pages/Home';

import { Header } from 'components/Header';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <ConfigProvider locale={locale}>
        <Header />

        <Home driver={driverStore} />

        <GlobalStyles />
      </ConfigProvider>
    </ThemeProvider>
  );
}
