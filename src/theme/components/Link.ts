import { SystemStyleObject } from '@chakra-ui/react';

const baseStyle: SystemStyleObject = {
    color: 'teal.400',
    '@media (hover)': {
        ':hover': {
            color: 'teal.400'
        }
    }
};

export const Link = {
    baseStyle
};
