import { mode, Styles } from '@chakra-ui/theme-tools';

export const styles: Styles = {
    global: (props) => ({
        body: {
            fontFamily: 'body',
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('white', 'gray.800')(props),
            transitionProperty: 'background-color',
            transitionDuration: 'normal',
            lineHeight: 'base'
        },
        '*::placeholder': {
            color: mode('gray.500', 'gray.200')(props)
        },
        '*, *::before, &::after': {
            borderColor: mode('gray.200', 'gray.400')(props),
            wordWrap: 'break-word'
        }
    })
};
