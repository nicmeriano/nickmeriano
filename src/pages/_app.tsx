import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'theme';
import '@fontsource/rajdhani/400.css';
import '@fontsource/rajdhani/500.css';
import '@fontsource/rajdhani/600.css';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/source-sans-pro/600.css';
import '@fontsource/source-sans-pro/700.css';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Reset scroll to top on refresh
        window.history.scrollRestoration = 'manual';
        // HACK: Prevent autoscroll when section has is present in the URL on first load (messes with intro animation)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'auto' });
        });
    }, []);
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
