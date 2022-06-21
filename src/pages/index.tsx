import { Box, Grid, GridItem, HStack, Link, List, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

const NavLink: FC<{ children: ReactNode; href?: string; expanded?: boolean; active?: boolean }> = ({
    children,
    href = '#',
    expanded = false,
    active = false
}) => {
    return (
        <NextLink passHref href={href}>
            <Link
                px="16px"
                py="4px"
                borderColor="gray.800"
                border={`1px solid ${expanded ? 'transparent' : 'var(--chakra-colors-gray-700)'}`}
                // bg="gray.800"
                borderRadius="3px"
                minWidth={expanded ? '210px' : 0}
                w="fit-content"
                // alignSelf={expanded ? 'stretch' : 'flex-end'}
                transition="min-width 300ms, background-color 300ms"
                bg={active ? 'gray.800' : 'transparent'}
                position="relative"
                _hover={{
                    bg: 'gray.800'
                }}
                _before={{
                    content: "''",
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    marginTop: 'auto',
                    marginBottom: 'auto',
                    left: '-8px',
                    height: '75%',
                    width: '4px',
                    borderRadius: '3px',
                    background: '#FF6B00',
                    display: active ? 'block' : 'none',
                    transition: 'display 500ms'
                }}
                data-navlink
            >
                {children}
            </Link>
        </NextLink>
    );
};

const Home: NextPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const projectsRef = useRef(null);
    const [activeSection, setActiveSection] = useState<string>();

    useEffect(() => {
        // Top scroll observer
        const anchor: HTMLElement | null = document.querySelector('#anchor');

        const onScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        const scrollObserver = new IntersectionObserver(onScroll);

        scrollObserver.observe(anchor as HTMLElement);

        // Section highlight observer
        const header: HTMLElement | null = document.querySelector('#header');
        const sections = Array.from(document.querySelectorAll('[data-section]'));

        if (!header) {
            return;
        }

        let direction: 'up' | 'down' = 'down';
        let prevYPosition = 0;

        const getTargetSection = (entry: IntersectionObserverEntry) => {
            const index = sections.findIndex((section) => section == entry.target);

            if (index >= sections.length - 1) {
                return entry.target;
            } else {
                return sections[index + 1];
            }
        };

        const shouldUpdate = (entry: IntersectionObserverEntry) => {
            if (direction === 'down' && !entry.isIntersecting) {
                return true;
            }

            if (direction === 'up' && entry.isIntersecting) {
                return true;
            }

            return false;
        };

        const onIntersect: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (window.scrollY > prevYPosition) {
                    direction = 'down';
                } else {
                    direction = 'up';
                }

                prevYPosition = window.scrollY;

                const target = direction === 'down' ? getTargetSection(entry) : entry.target;

                if (shouldUpdate(entry)) {
                    const section = (target as HTMLElement).dataset.section;
                    setActiveSection(window.scrollY > 0 ? section : 'about');
                }
            });
        };
        const options: IntersectionObserverInit = {
            rootMargin: `${header.offsetHeight * -1}px`,
            threshold: 0
        };

        const observer = new IntersectionObserver(onIntersect, options);

        sections.forEach((section) => {
            observer.observe(section);
        });
    }, []);

    return (
        <>
            <Box id="anchor" position="absolute" width="full" top="0px"></Box>
            <Box id="header" position="fixed" width="full" h="10px"></Box>
            <Grid
                gridTemplate="sidenav main"
                gridTemplateColumns="1fr minmax(600px,770px)"
                mx="auto"
                width="fit-content"
                gap="8"
                pt="30vh"
            >
                <GridItem width="310px" height="100%">
                    <VStack color="gray.300" alignItems="end" position="sticky" p="2" top="60px">
                        <NavLink
                            expanded={isScrolled}
                            active={isScrolled && (!activeSection || activeSection === 'about')}
                            href="#about"
                        >
                            About
                        </NavLink>
                        <NavLink
                            expanded={isScrolled}
                            active={isScrolled && activeSection === 'tech-stack'}
                            href="#tech-stack"
                        >
                            Tech Stack
                        </NavLink>
                        <NavLink
                            expanded={isScrolled}
                            active={isScrolled && activeSection === 'projects'}
                            href="#projects"
                        >
                            Projects
                        </NavLink>
                        <NavLink expanded={isScrolled} active={isScrolled && activeSection === 'posts'} href="#posts">
                            Posts
                        </NavLink>
                        <NavLink
                            expanded={isScrolled}
                            active={isScrolled && activeSection === 'contact'}
                            href="#contact"
                        >
                            Contact
                        </NavLink>
                    </VStack>
                </GridItem>
                <GridItem w="100%" h="full" p="8" color="gray.100" pb="80vh">
                    <Box as="section" mb="24">
                        <Text>Hi, I&apos;m</Text>
                        <Text fontSize="5xl" lineHeight="none" mt="1" textTransform="uppercase">
                            Nick Meriano
                        </Text>
                        <Text fontSize="xl" lineHeight="none" letterSpacing="wide">
                            Software Engineer at <strong>Ephesoft</strong>
                        </Text>
                        <HStack mt="4" color="gray.300" spacing="4">
                            <Link target="_blank" href="https://github.com/nicmeriano">
                                Github
                            </Link>
                            <Link target="_blank" href="https://linkedin.com">
                                LinkedIn
                            </Link>
                            <Link target="_blank" href="https://codepen.com">
                                Codepen
                            </Link>
                        </HStack>
                    </Box>
                    <Box
                        as="section"
                        data-section="about"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="12rem"
                        id="about"
                    >
                        <Text mb="4" color="gray.400" textTransform="uppercase">
                            About
                        </Text>
                        <VStack alignItems="start" letterSpacing="wide">
                            <Text>
                                Experienced front-end engineer with an affinity for UI/UX design , passionate about{' '}
                                building applications for the web.
                            </Text>

                            <Text>
                                Currently leading the front-end team at{' '}
                                <Text as="span" color="#FF6B00">
                                    Ephesoft
                                </Text>
                                , building the future of intelligent document processing and automation.
                            </Text>
                        </VStack>
                    </Box>
                    <Box
                        as="section"
                        data-section="tech-stack"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        id="tech-stack"
                        mb="12rem"
                        mt="24"
                    >
                        <Text mb="4" color="gray.400" textTransform="uppercase">
                            Tech Stack
                        </Text>
                        <VStack alignItems="start" letterSpacing="wide">
                            <Text>Here are some of the tools & technologies I most frequently use:</Text>
                        </VStack>
                        <UnorderedList>
                            <ListItem>Angular</ListItem>
                            <ListItem>Typescript</ListItem>
                            <ListItem>RxJS</ListItem>
                            <ListItem>Git</ListItem>
                            <ListItem>VS Code</ListItem>
                            <ListItem>AWS</ListItem>
                            <ListItem>Bitbucket Pipelines</ListItem>
                            <ListItem>HTML5</ListItem>
                            <ListItem>CSS3 (SCSS)</ListItem>
                            <ListItem>NodeJS</ListItem>
                        </UnorderedList>
                    </Box>
                    <Box
                        ref={projectsRef}
                        as="section"
                        data-section="projects"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="24"
                        id="projects"
                    >
                        <Text mb="4" color="gray.400" textTransform="uppercase">
                            Projects
                        </Text>
                    </Box>
                    <Box
                        as="section"
                        data-section="posts"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="24"
                        id="posts"
                    >
                        <Text mb="4" color="gray.400" textTransform="uppercase">
                            Posts
                        </Text>
                    </Box>
                    <Box
                        as="section"
                        data-section="contact"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="24"
                        id="contact"
                    >
                        <Text mb="4" color="gray.400" textTransform="uppercase">
                            Contact
                        </Text>
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
};

export default Home;
