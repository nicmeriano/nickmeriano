import { ChakraTheme, ThemeConfig, ThemeDirection } from '@chakra-ui/react';
import { foundations } from './foundations';
import { styles } from './styles';

const direction: ThemeDirection = 'ltr';

const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: 'light',
    cssVarPrefix: 'chakra'
};

export const theme: ChakraTheme = {
    direction,
    ...foundations,
    components: {},
    styles,
    config
};
