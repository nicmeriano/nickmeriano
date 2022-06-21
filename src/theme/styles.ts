import { mode, Styles } from '@chakra-ui/theme-tools';

export const styles: Styles = {
    global: (props) => ({
        html: {
            scrollBehavior: 'smooth'
        },
        'html, body, #__next': {
            height: '100%'
        },
        body: {
            fontFamily: 'body',
            color: mode('gray.800', 'gray.50')(props),
            bg: mode('white', 'gray.900')(props),
            transitionProperty: 'background-color',
            transitionDuration: 'normal',
            lineHeight: 'base'
        },
        '*::placeholder': {
            color: mode('gray.500', 'gray.200')(props)
        },
        '*, *::before, &::after': {
            borderColor: mode('gray.200', 'gray.400')(props),
            wordWrap: 'break-word',
            outline: 'none'
        },
        ':focus:not(:focus-visible)': {
            boxShadow: 'none',
            outline: 'none'
        },
        ':focus': {
            boxShadow: '0 0 0 2px var(--chakra-colors-blue-400)'
        }
    })
};
