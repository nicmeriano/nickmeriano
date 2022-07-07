import { tabsAnatomy as parts } from '@chakra-ui/anatomy';

import { PartsStyleFunction } from '@chakra-ui/theme-tools';

const variantLine: PartsStyleFunction<typeof parts> = () => ({
    tab: {
        _active: {
            bg: 'transparent'
        }
    }
});

const variantSolidRounded: PartsStyleFunction<typeof parts> = () => ({
    tab: {
        borderRadius: 'md'
    }
});

export const Tabs = {
    variants: {
        line: variantLine,
        'solid-rounded': variantSolidRounded
    }
};
