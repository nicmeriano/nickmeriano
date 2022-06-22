import {
    Avatar,
    Box,
    Grid,
    GridItem,
    HStack,
    Link,
    List,
    ListItem,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    UnorderedList,
    VStack
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

type Project = {
    name: string;
    description: string;
    stack: string[];
    srcLink: string;
    demoLink: string;
    img: string;
};

const projects: Project[] = [
    {
        name: 'Project A',
        description: 'Description for project A',
        stack: ['NextJS', 'MongoDB', 'ChakraUI'],
        srcLink: 'https://www.google.com',
        demoLink: 'https://www.google.com',
        img: 'https://cdn.dribbble.com/userupload/2936723/file/original-e229cd37622c465195b21829a6761e48.jpg?compress=1&resize=1504x1128'
    },
    {
        name: 'Project B',
        description: 'Description for project A',
        stack: ['NextJS', 'MongoDB', 'ChakraUI'],
        srcLink: 'https://www.google.com',
        demoLink: 'https://www.google.com',
        img: 'https://cdn.dribbble.com/userupload/2936723/file/original-e229cd37622c465195b21829a6761e48.jpg?compress=1&resize=1504x1128'
    },
    {
        name: 'Project C',
        description: 'Description for project A',
        stack: ['NextJS', 'MongoDB', 'ChakraUI'],
        srcLink: 'https://www.google.com',
        demoLink: 'https://www.google.com',
        img: 'https://cdn.dribbble.com/userupload/2936723/file/original-e229cd37622c465195b21829a6761e48.jpg?compress=1&resize=1504x1128'
    },
    {
        name: 'Project D',
        description: 'Description for project A',
        stack: ['NextJS', 'MongoDB', 'ChakraUI'],
        srcLink: 'https://www.google.com',
        demoLink: 'https://www.google.com',
        img: 'https://cdn.dribbble.com/userupload/2936723/file/original-e229cd37622c465195b21829a6761e48.jpg?compress=1&resize=1504x1128'
    }
];

const NavLink: FC<{ children: ReactNode; href?: string; expanded?: boolean; active?: boolean }> = ({
    children,
    href = '#',
    expanded = false,
    active = false
}) => {
    return (
        <NextLink passHref href={href}>
            <Link
                px="4"
                py="2"
                borderColor="gray.800"
                border={`1px solid ${expanded ? 'transparent' : 'var(--chakra-colors-gray-700)'}`}
                // bg="gray.800"
                borderRadius="3px"
                minWidth={expanded ? '100%' : 0}
                w="fit-content"
                // alignSelf={expanded ? 'stretch' : 'flex-end'}
                transition="min-width 250ms ease-in, background-color 300ms"
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
                    background: 'orange.400',
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
            <Box
                position="fixed"
                width="full"
                top="0"
                left="0"
                height="10vh"
                transition="opacity 300ms, transform 300ms"
                opacity={isScrolled ? 0 : 0.8}
                pointerEvents="none"
                transform={isScrolled ? 'translateY(-100%)' : 'rotate(1.5deg)'}
                borderBottom="1px solid"
                borderColor="gray.700"
            ></Box>
            <Box
                position="fixed"
                width="full"
                bottom="0"
                left="0"
                height="10vh"
                transition="opacity 300ms, transform 300ms"
                opacity={isScrolled ? 0 : 0.8}
                pointerEvents="none"
                transform={isScrolled ? 'translateY(100%)' : 'rotate(-1.5deg)'}
                borderTop="1px solid"
                borderColor="gray.700"
            ></Box>
            {/* <Box
                position="absolute"
                width="full"
                bottom="0"
                left="0"
                height="50vh"
                // background="gray.800"
                transition="opacity 300ms"
                opacity={isScrolled ? 0 : .8}
                pointerEvents="none"
                _before={{
                    content: "''",
                    backgroundImage:
                        'url(https://media-exp2.licdn.com/dms/image/C5616AQEfb9Lxer435A/profile-displaybackgroundimage-shrink_350_1400/0/1565886445409?e=1661385600&v=beta&t=3HbyudrCDsXbRwbY6SRJ95onunYsMsPilt1eOxY-P48)',
                    width: '90%',
                    height: '20vh',
                    display: 'block',
                    position: 'fixed',
                    top: '10',
                    left: 0,
                    right: 0,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    margin: '0 auto',
                    borderRadius: 'md',
                    opacity: .5
                }}
            ></Box> */}
            <Box id="anchor" position="absolute" width="full" top="0px"></Box>
            <Box id="header" position="fixed" width="full" h="10px"></Box>
            <Box
                position="fixed"
                zIndex="overlay"
                bottom="0"
                left="0"
                width="full"
                h="8"
                bg="linear-gradient(180deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"
            ></Box>
            <Box
                position="fixed"
                zIndex="overlay"
                top="0"
                left="0"
                width="full"
                h="8"
                bg="linear-gradient(0deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"
            ></Box>
            <Grid
                gridTemplate="sidenav main"
                gridTemplateColumns="1fr minmax(600px,770px)"
                mx="auto"
                width="fit-content"
                gap="4"
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
                            active={isScrolled && activeSection === 'projects'}
                            href="#projects"
                        >
                            Projects
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
                <GridItem w="100%" h="full" p="8" pt="2" color="gray.100" pb="80vh">
                    <HStack justify="start" align="start" gap="24">
                        <Box as="section" mb="24">
                            <Text fontSize="lg">Hi, I&apos;m</Text>
                            <Text fontSize="5xl" lineHeight="none" mt="1" textTransform="uppercase">
                                Nick Meriano
                            </Text>
                            <Text fontSize="xl" lineHeight="none" letterSpacing="wide" color="gray.200">
                                Software Engineer at <strong>Ephesoft</strong>
                            </Text>
                            <HStack
                                mt="4"
                                color="gray.400"
                                spacing="4"
                                fontSize="lg"
                                sx={{
                                    '> *:hover': {
                                        color: 'orange.400',
                                        transition: 'color 300ms'
                                    }
                                }}
                            >
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
                        <Avatar
                            border="2px solid var(--chakra-colors-gray-700)"
                            w="128px"
                            src="https://www.nickmeriano.com/static/43da40990a73c2290eeada7980c22078/59139/profile-img.png"
                        ></Avatar>
                    </HStack>
                    <Box
                        as="section"
                        data-section="about"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="64"
                        id="about"
                        maxWidth="550px"
                    >
                        <Tabs colorScheme="orange" variant="solid-rounded" minHeight="44">
                            <TabList mb="4" borderColor="gray.800">
                                <Tab borderRadius="md">General</Tab>
                                <Tab borderRadius="md">Tech Stack</Tab>
                                <Tab borderRadius="md">Hobbies</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <VStack alignItems="start" letterSpacing="wide">
                                        <Text>
                                            Experienced front-end engineer with an affinity for UI/UX design, passionate
                                            about building applications for the web.
                                        </Text>

                                        <Text>
                                            Currently leading the front-end team at{' '}
                                            <Text as="span" color="orange.400">
                                                Ephesoft
                                            </Text>
                                            , building the future of intelligent document processing and automation.
                                        </Text>
                                    </VStack>
                                </TabPanel>
                                <TabPanel>
                                    <p>two!</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>three!</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                    {/* <Box
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
                    </Box> */}
                    <Box
                        ref={projectsRef}
                        as="section"
                        data-section="projects"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="64"
                        id="projects"
                    >
                        <Text mb="8" color="gray.500" textTransform="uppercase" fontWeight="medium">
                            Projects
                        </Text>
                        <VStack wrap="wrap" gap="2" spacing="0" role="group">
                            {projects.map((project) => (
                                <Box
                                    key={project.name}
                                    p="10"
                                    w="full"
                                    borderRadius="sm"
                                    position="relative"
                                    _groupHover={{
                                        opacity: '0.5'
                                    }}
                                    bg="gray.800"
                                    cursor="pointer"
                                    transition="transform 200ms ease-in-out, opacity 200ms"
                                    _hover={{
                                        // transform: 'scale(1.06)',
                                        opacity: '1 !important'
                                    }}
                                >
                                    <HStack>
                                        {project.stack.map((tech) => (
                                            <Text
                                                key={tech}
                                                textTransform="uppercase"
                                                fontSize="xs"
                                                fontWeight="semibold"
                                                color="gray.300"
                                                letterSpacing="widest"
                                            >
                                                {tech}
                                            </Text>
                                        ))}
                                    </HStack>
                                    <Text fontSize="2xl" fontWeight="semibold">
                                        {project.name}
                                    </Text>
                                    <Text fontSize="md" color="gray.400">
                                        {project.description}
                                    </Text>
                                </Box>
                            ))}
                        </VStack>
                        {/* <HStack wrap="wrap" gap="8" spacing="0">
                            {projects.map((project) => (
                                <Box
                                    key={project.name}
                                    h="480px"
                                    w="320px"
                                    borderRadius="md"
                                    position="relative"
                                    _even={{ transform: 'translateY(50px)' }}
                                    bg={`linear-gradient(0deg, rgb(34, 35, 38) 9%, rgba(33, 34, 37, 0.89) 42%, rgba(34, 35, 38, 0) 156%), url(${project.img}) center top / cover`}
                                    opacity=".7"
                                    cursor="pointer"
                                    transition="transform 300ms, opacity 300ms"
                                    _hover={{
                                        transform: 'scale(1.02)',
                                        opacity: 1,
                                        _even: {
                                            transform: 'scale(1.02) translateY(50px)'
                                        }
                                    }}
                                ></Box>
                            ))}
                        </HStack> */}
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
                        <Text mb="8" color="gray.500" textTransform="uppercase" fontWeight="medium">
                            Contact
                        </Text>
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
};

export default Home;
