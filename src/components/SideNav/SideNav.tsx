import { Box, Link, List, ListItem } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { slideIn } from 'theme';
import NextLink from 'next/link';

export type SideNavProps = {
    isExpanded: boolean;
    activeLink?: string;
};

const NavLink: FC<{ children: ReactNode; href?: string; expanded?: boolean; active?: boolean }> = ({
    children,
    href = '#',
    expanded = false,
    active = false
}) => {
    return (
        <NextLink passHref href={href}>
            <Link
                px="5"
                py="3"
                w="full"
                border="1px"
                borderColor={expanded ? 'transparent' : 'gray.800'}
                borderRadius="md"
                transition="min-width 250ms ease-in-out, background-color 250ms, transform 250ms ease-out"
                bg={expanded ? (active ? 'teal.300' : 'gray.900') : 'gray.900'}
                color={expanded ? (active ? 'teal.900' : 'text.secondary') : 'text.secondary'}
                fontWeight={active ? 'semibold' : 'medium'}
                lineHeight="none"
                animation={`${slideIn('right')} 1500ms cubic-bezier(0.15, 1, 0.3, 1)`}
                data-navlink
                display="inline-block"
                _hover={{
                    bg: active ? 'teal.300' : 'gray.800',
                    color: (expanded ? (active ? 'teal.900' : 'text.secondary') : 'text.secondary') + ' !important'
                }}
            >
                {children}
            </Link>
        </NextLink>
    );
};

export const SideNav: FC<SideNavProps> = ({ isExpanded, activeLink }) => {
    return (
        <Box
            as="nav"
            py="4"
            pr="6"
            top="14"
            alignItems="end"
            position="sticky"
            borderRight="1px"
            borderColor={isExpanded ? 'transparent' : 'gray.800'}
            transition="border-color 300ms"
            overflow="hidden"
        >
            <List
                spacing="2"
                display="flex"
                flexDir="column"
                alignItems="end"
                sx={{
                    li: {
                        minWidth: isExpanded ? '100%' : 0,
                        w: 'fit-content',
                        transition: 'min-width 250ms ease-in-out, background-color 250ms, transform 250ms ease-out'
                    }
                }}
            >
                <ListItem>
                    <NavLink
                        expanded={isExpanded}
                        active={isExpanded && (!activeLink || activeLink === 'about')}
                        href="#about"
                    >
                        About
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink expanded={isExpanded} active={isExpanded && activeLink === 'projects'} href="#projects">
                        Projects
                    </NavLink>
                </ListItem>
                <ListItem>
                    <NavLink expanded={isExpanded} active={isExpanded && activeLink === 'contact'} href="#contact">
                        Contact
                    </NavLink>
                </ListItem>
            </List>
        </Box>
    );
};
