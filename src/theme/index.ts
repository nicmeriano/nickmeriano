import { ChakraTheme, extendTheme, ThemeConfig, ThemeDirection } from '@chakra-ui/react';
import { foundations } from './foundations';
import { styles } from './styles';

const direction: ThemeDirection = 'ltr';

const config: ThemeConfig = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    cssVarPrefix: 'chakra'
};

const {
    components: { Tabs, Badge, Divider, Avatar }
} = extendTheme() as ChakraTheme;

// Remove Tab outline when focused
Tabs.baseStyle = { ...Tabs.baseStyle, _focus: {} };

export const theme: ChakraTheme = {
    direction,
    ...foundations,
    components: { Tabs, Badge, Divider, Avatar },
    styles,
    config
};
