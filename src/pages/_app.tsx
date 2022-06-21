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
    // Reset scroll to prevent wrong section from being highlighted in nav when refreshing the page from an anchor point
    useEffect(() => {
        window.history.scrollRestoration = 'manual';
    }, []);
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
