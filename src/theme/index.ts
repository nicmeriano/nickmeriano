import { ChakraTheme, extendTheme, ThemeConfig, ThemeDirection } from '@chakra-ui/react';
import { foundations } from './foundations';
import { components } from './components';
import { styles } from './styles';

const direction: ThemeDirection = 'ltr';

const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: 'dark'
};

export const theme = extendTheme({
    direction,
    ...foundations,
    components,
    styles,
    config
});

export * from './animations';

export default theme;
