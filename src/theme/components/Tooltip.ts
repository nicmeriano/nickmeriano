import { mode, cssVar, SystemStyleFunction } from '@chakra-ui/theme-tools';

const $bg = cssVar('tooltip-bg');

const baseStyle: SystemStyleFunction = (props) => {
    const bg = mode('gray.700', 'gray.800')(props);
    return {
        [$bg.variable]: `colors.${bg}`,
        color: mode('whiteAlpha.900', 'gray.300')(props),
        letterSpacing: 'wide',
        fontWeight: 'normal'
    };
};

export const Tooltip = {
    baseStyle
};
