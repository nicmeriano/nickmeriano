import {
    Avatar,
    Badge,
    Box,
    Divider,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tooltip,
    VStack
} from '@chakra-ui/react';
import { Icon } from 'components';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { FC, ReactNode, useEffect, useState } from 'react';

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
                px="5"
                py="3"
                borderColor="gray.800"
                border={`1px solid ${expanded ? 'transparent' : 'var(--chakra-colors-gray-800)'}`}
                borderRadius="md"
                minWidth={expanded ? '100%' : 0}
                w="fit-content"
                transition="min-width 250ms ease-in, background-color 300ms, transform 250ms ease-out"
                bg={expanded ? (active ? 'teal.300' : 'transparent') : 'transparent'}
                color={expanded ? (active ? 'teal.900' : 'text.secondary') : 'text.secondary'}
                fontWeight={active ? 'semibold' : 'medium'}
                transform={active ? 'scale(1.03)' : ''}
                lineHeight="none"
                position="relative"
                _hover={{
                    bg: active ? 'teal.300' : 'gray.800'
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
            {/* <Box
                position="fixed"
                width="full"
                top="-8"
                left="0"
                height="10vh"
                transition="opacity 300ms, transform 300ms"
                opacity={isScrolled ? 0 : 0.8}
                transform={isScrolled ? 'translateY(-100%)' : 'rotate(0)'}
                borderBottom="2px solid"
                borderColor="gray.800"
                // bg="teal.600"
            ></Box> */}
            {/* <Box
                position="fixed"
                width="full"
                bottom="0"
                left="0"
                height="24"
                transition="opacity 300ms, transform 300ms"
                opacity={isScrolled ? 0 : 0.8}
                transform={isScrolled ? 'translateY(100%)' : 'rotate(0)'}
                // borderTop="2px solid"
                // borderColor="gray.800"
                // bg="teal.600"
                display="grid"
                alignContent="center"
                justifyContent="center"
            >
                <Icon name="chevron-down" size="xl" animation={`${float} 3s infinite`} color="teal.500"/>
            </Box> */}

            <Box id="anchor" position="absolute" width="full" top="0px"></Box>
            <Box id="header" position="fixed" width="full" h="24px"></Box>
            <Box
                position="fixed"
                zIndex="overlay"
                bottom="0"
                left="0"
                width="full"
                h="8"
                bg="linear-gradient(180deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"
                opacity={isScrolled ? '1' : '0'}
                transition="opacity 300ms"
            ></Box>
            <Box
                position="fixed"
                zIndex="overlay"
                top="0"
                left="0"
                width="full"
                h="8"
                bg="linear-gradient(0deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"
                opacity={isScrolled ? '1' : '0'}
                transition="opacity 300ms"
            ></Box>
            <Grid
                gridTemplateAreas={{ base: `'main main'`, lg: `'sidenav main'` }}
                gridTemplateColumns="1fr 2fr"
                mx="auto"
                width="full"
                maxWidth={{ base: 'lg', lg: '5xl' }}
                pt="30vh"
                gap="6"
            >
                <GridItem width="100%" height="100%" gridArea="sidenav" display={{ base: 'none', lg: 'block' }} pl="6">
                    <VStack alignItems="end" position="sticky" p="2" top="12">
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
                <GridItem w="full" h="full" p="6" pt="0" pb="60vh" gridArea="main">
                    <Stack
                        justify="space-between"
                        align="start"
                        gap="12"
                        maxWidth="lg"
                        direction={{ base: 'column-reverse', sm: 'row' }}
                    >
                        <Box as="section" mb="32">
                            <Text fontSize="lg" mb="2">
                                Hi, I&apos;m
                            </Text>
                            <Heading size="2xl" whiteSpace="nowrap" mb="1">
                                Nick Meriano
                            </Heading>
                            <Text
                                fontSize="xl"
                                whiteSpace="nowrap"
                                color="text.secondary"
                                sx={{ span: { color: 'text.primary' } }}
                            >
                                Software Engineer at <span>Ephesoft</span>
                            </Text>
                            <HStack mt="6" spacing="5">
                                <Tooltip label="GitHub">
                                    <Link isExternal href="https://github.com/nicmeriano" color="text.secondary">
                                        <Icon name="github" />
                                    </Link>
                                </Tooltip>
                                <Tooltip label="LinkedIn">
                                    <Link isExternal href="https://linkedin.com" color="text.secondary">
                                        <Icon name="linkedin" />
                                    </Link>
                                </Tooltip>
                                <Tooltip label="Email">
                                    <Link isExternal href="mailto:nicmeriano@gmail.com" color="text.secondary">
                                        <Icon name="mail" />
                                    </Link>
                                </Tooltip>
                            </HStack>
                        </Box>

                        <Avatar
                            border="2px solid var(--chakra-colors-gray-300)"
                            size={{ base: 'xl', md: '2xl' }}
                            src="https://www.nickmeriano.com/static/43da40990a73c2290eeada7980c22078/59139/profile-img.png"
                        ></Avatar>
                    </Stack>
                    <Box
                        as="section"
                        data-section="about"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        id="about"
                        pt="8"
                    >
                        <Tabs colorScheme="teal">
                            <TabList mb="6" borderColor="gray.800">
                                <Tab>Intro</Tab>
                                <Tab>Tech Stack</Tab>
                                <Tab>Hobbies</Tab>
                            </TabList>
                            <TabPanels minHeight="270px" color="text.secondary">
                                <TabPanel px="0">
                                    <VStack alignItems="start" letterSpacing="wide">
                                        <Text>
                                            Hey, I&apos;m Nick. I&apos;m a software engineer at{' '}
                                            <Link target="_blank" href="https://ephesoft.com">
                                                Ephesoft
                                            </Link>
                                            , where my team is building the future of intelligent document processing
                                            and automation.
                                        </Text>
                                        <Text>
                                            Specialized in frontend development, I have an affinity for UI/UX design and
                                            am passionate about building applications for the web.
                                        </Text>
                                        <Text pt="4">Welcome to my website!</Text>
                                    </VStack>
                                </TabPanel>
                                <TabPanel px="0">
                                    <VStack alignItems="start">
                                        <Text mb="6">
                                            {' '}
                                            Here&apos;s a (small) list of tools, languages and frameworks I frequently
                                            use:
                                        </Text>

                                        <Divider borderColor="gray.700" />
                                        <HStack w="full">
                                            <Text flex="1">Frontend</Text>
                                            <HStack justifyContent="end">
                                                <Badge fontSize="sm">Angular</Badge>
                                                <Badge fontSize="sm">Typescript</Badge>
                                                <Badge fontSize="sm">RxJS</Badge>
                                                <Badge fontSize="sm">HTML5</Badge>
                                                <Badge fontSize="sm">CSS3</Badge>
                                            </HStack>
                                        </HStack>
                                        <Divider borderColor="gray.700" />
                                        <HStack w="full">
                                            <Text flex="1">Backend</Text>
                                            <HStack justifyContent="end">
                                                <Badge fontSize="sm">NodeJS</Badge>
                                                <Badge fontSize="sm">AWS</Badge>
                                                <Badge fontSize="sm">Bitbucket Pipelines</Badge>
                                            </HStack>
                                        </HStack>
                                        <Divider borderColor="gray.700" />

                                        <HStack w="full">
                                            <Text flex="1">Testing</Text>
                                            <HStack justifyContent="end">
                                                <Badge fontSize="sm">Cypress</Badge>
                                                <Badge fontSize="sm">Jasmine</Badge>
                                                <Badge fontSize="sm">Mocha</Badge>
                                            </HStack>
                                        </HStack>
                                        <Divider borderColor="gray.700" />

                                        <HStack w="full">
                                            <Text flex="1">Tools & Other</Text>
                                            <HStack justifyContent="end">
                                                <Badge fontSize="sm">VS Code</Badge>
                                                <Badge fontSize="sm">Figma</Badge>
                                                <Badge fontSize="sm">Google</Badge>
                                                <Badge fontSize="sm">New Relic</Badge>
                                            </HStack>
                                        </HStack>
                                        <Divider borderColor="gray.700" />
                                    </VStack>
                                </TabPanel>
                                <TabPanel px="0">
                                    <Text>
                                        When not in the office I&apos;me most likely to be found enjoying the outdoors,
                                        whether that be hiking, playing tennis or at my favorite coffee shop down the
                                        street.
                                    </Text>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                    <Box
                        as="section"
                        data-section="projects"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        pt="32"
                        id="projects"
                    >
                        <VStack wrap="wrap" gap="2" spacing="0" role="group">
                            {projects.map((project) => (
                                <Box
                                    key={project.name}
                                    p="10"
                                    w="full"
                                    borderRadius="md"
                                    position="relative"
                                    _groupHover={{
                                        opacity: '0.5'
                                    }}
                                    bg="gray.800"
                                    cursor="pointer"
                                    transition="transform 200ms ease-in-out, opacity 200ms"
                                    _hover={{
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
                                                letterSpacing="widest"
                                            >
                                                {tech}
                                            </Text>
                                        ))}
                                    </HStack>
                                    <Text fontSize="2xl" fontWeight="semibold">
                                        {project.name}
                                    </Text>
                                    <Text fontSize="md">{project.description}</Text>
                                </Box>
                            ))}
                        </VStack>
                    </Box>
                    <Box
                        as="section"
                        data-section="contact"
                        opacity={isScrolled ? 1 : 0}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="48"
                        id="contact"
                        pt="64"
                    >
                        <Heading mb="8" color="text.secondary" size="md">
                            Let&apos;s Connect
                        </Heading>
                        <VStack alignItems="start" letterSpacing="wide">
                            <Text color="text.secondary">
                                Looking to hire a frontend engineer, chat about web development or just want to say hi?
                                Whatever it is, shoot me an email at{' '}
                                <Link href="mailto:nicmeriano@gmail.com">nicmeriano@gmail.com</Link> and I&apos;ll get
                                back to you as soon as I can.
                            </Text>
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>
        </>
    );
};

export default Home;
