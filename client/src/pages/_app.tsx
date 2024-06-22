// pages/_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import ScreenshotsPage from '@/components/ScreenshotsPage';

function MyApp({ Component, pageProps }: AppProps) {
  // Check if current page is /screenshots, then render ScreenshotsPage component
  const isScreenshotsPage = Component === ScreenshotsPage;

  return (
    <>
      {isScreenshotsPage ? (
        <ScreenshotsPage {...pageProps} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
