import * as React from 'react';

const ONE_MINUTE_IN_MS = 1000 * 60;

export function usePolling(fn: Function, rate = ONE_MINUTE_IN_MS) {
  const [isPolling, setIsPolling] = React.useState(false);

  React.useEffect(() => {
    function handleWindowBlur() {
      setIsPolling(false);
    }

    function handleWindowFocus() {
      setIsPolling(true);
      fn();
    }

    const documentHasFocus = document.hasFocus();

    if (documentHasFocus) {
      setIsPolling(true);
    }

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [fn]);

  React.useEffect(() => {
    const pollingInterval = setInterval(() => {
      if (isPolling) {
        fn();
      }
    }, rate);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [fn, isPolling, rate]);
}
