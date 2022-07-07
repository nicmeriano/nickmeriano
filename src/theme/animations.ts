import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const slideIn = (dir: 'left' | 'right') => keyframes`
    from {
        transform: translate3D(${dir === 'left' ? '-100%' : '100%'}, 0, 0);
    }
    to {
        transform: translate3D(0, 0, 0);
    }
`;
