import { Box, ChakraProps } from '@chakra-ui/react';
import { FC } from 'react';

export type ScrollBorderProps = {
    isVisible?: boolean;
};

export const ScrollBorder: FC<ScrollBorderProps> = ({ isVisible = true }) => {
    const styles: ChakraProps = {
        position: 'fixed',
        zIndex: 'overlay',
        left: '0',
        width: 'full',
        h: '8',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms',
        pointerEvents: 'none'
    };

    return (
        <>
            <Box {...styles} top="0" bg="linear-gradient(0deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"></Box>
            <Box
                {...styles}
                bottom="0"
                bg="linear-gradient(180deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"
            ></Box>
        </>
    );
};
