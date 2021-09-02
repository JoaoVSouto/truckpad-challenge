import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'styles/global';
import light from 'styles/themes/light';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <h1>hello world</h1>

      <GlobalStyles />
    </ThemeProvider>
  );
}
