import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    yellow: {
      500: string;
    };

    gray: {
      300: string;
      800: string;
    };
  }
}
