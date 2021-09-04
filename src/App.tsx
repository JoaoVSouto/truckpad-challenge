import { ThemeProvider } from 'styled-components';

import { driverStore } from 'store/driver';

import { Home } from 'pages/Home';

import { Header } from 'components/Header';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <Header />

      <Home driver={driverStore} />

      <GlobalStyles />
    </ThemeProvider>
  );
}
