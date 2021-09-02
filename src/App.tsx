import { ThemeProvider } from 'styled-components';

import { Home } from 'pages/Home';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <Home />

      <GlobalStyles />
    </ThemeProvider>
  );
}
