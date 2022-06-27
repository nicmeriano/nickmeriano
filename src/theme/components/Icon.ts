import { SystemStyleObject } from '@chakra-ui/system';
import { SystemStyleObjectRecord } from '@chakra-ui/theme';

const baseStyle: SystemStyleObject = {
    fill: 'currentcolor'
};

const sizes: SystemStyleObjectRecord = {
    sm: {
        width: '18px',
        height: '18px'
    },
    md: {
        width: '20px',
        height: '20px'
    },
    lg: {
        width: '24px',
        height: '24px'
    },
    xl: {
        width: '28px',
        height: '28px'
    }
};

export const Icon = {
    baseStyle,
    sizes,
    defaultProps: {
        size: 'lg'
    }
};
