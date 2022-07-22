import { Box } from '@chakra-ui/layout';
import { BoxProps } from '@chakra-ui/react';
import { ThemingProps, useStyleConfig } from '@chakra-ui/system';
import { PropsWithChildren } from 'react';
import icons from './icons/icons';

export function Icon(props: PropsWithChildren<ThemingProps & BoxProps & { name: keyof typeof icons }>) {
    const { variant, name, size, ...rest } = props;

    const styles = useStyleConfig('Icon', { variant, size });

    // Pass the computed styles into the `__css` prop
    return <Box __css={styles} {...rest} dangerouslySetInnerHTML={{ __html: icons[name] }}></Box>;
}
