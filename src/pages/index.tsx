import {
    Avatar,
    Badge,
    Box,
    Divider,
    Grid,
    GridItem,
    Heading,
    HStack,
    keyframes,
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

const fadeIn = keyframes`
    to {
        opacity: 1;
    }
`;

const slideIn = (dir: 'left' | 'right') => keyframes`
    from {
        transform: translateX(${dir === 'left' ? '-100%' : '100%'});
    }
    to {
        transform: translateX(0);
    }
`;

function random(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const particles = 10;
const particleStyles = () => {
    const styles: Record<string, any> = {};
    const colors = ['teal.400', 'orange.400', 'purple.400', 'gray.300', 'pink.400'];

    for (let i = 1; i <= particles; i++) {
        const keyframe = keyframes`
            0% {
                transform: translate3d(var(--x1),var(--y1),var(--z1));
                opacity: 0;
            }

            50% {
                opacity: ${Math.min(Math.floor(Math.random() * 100) / 100, 0.4)};
            }
            
            100% {
                transform: translate3d(var(--x2),var(--y2),var(--z2));
                opacity: 0; 
            }
        `;

        const size = random(1, 10);

        styles[`> div:nth-of-type(${i})`] = {
            '--x1': `calc(${random(1, 90)} * 1vw)`,
            '--y1': `calc(${random(1, 90)} * 1vh)`,
            '--z1': `calc(${random(1, 100)} * 1px)`,
            '--x2': `calc(${random(1, 90)} * 1vw)`,
            '--y2': `calc(${random(1, 90)} * 1vh)`,
            '--z2': `calc(${random(1, 100)} * 1px)`,
            w: size,
            h: size,
            bg: colors[random(0, colors.length - 1)],
            filter: `blur(${random(4, 20)}px)`,
            transform: 'translate3d(var(--x1),var(--y1),var(--z1))',
            opacity: 0,
            animation: `${keyframe} 60s ${i * 0.8}s infinite`,
            transition: 'background-color 300ms, filter 800ms, opacity 300ms'
        };
    }

    return styles;
};

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
                bg={expanded ? (active ? 'teal.300' : 'gray.900') : 'gray.900'}
                color={expanded ? (active ? 'teal.900' : 'text.secondary') : 'text.secondary'}
                fontWeight={active ? 'semibold' : 'medium'}
                lineHeight="none"
                position="relative"
                _hover={{
                    bg: active ? 'teal.300' : 'gray.800'
                }}
                data-navlink
                animation={`${slideIn('right')} 1500ms   ease-out`}
            >
                {children}
            </Link>
        </NextLink>
    );
};

const Home: NextPage = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>();
    const [particleOverlayStyles, setParticleOverlayStyles] = useState<any>();

    useEffect(() => {
        setParticleOverlayStyles(particleStyles());
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
                top="0"
                left="0"
                w="full"
                h="full"
                sx={particleOverlayStyles}
                opacity={isScrolled ? 0 : 1}
                transition="opacity 2s ease"
            >
                {[...Array(particles)].map((_, i) => (
                    <Box borderRadius="full" position="absolute" key={i} padding="4"></Box>
                ))}
            </Box>
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
                maxWidth={{ base: 'lg', md: '2xl', lg: '5xl' }}
                pt={{ base: '10vh', sm: '30vh' }}
                position="relative"
            >
                <GridItem
                    width="100%"
                    height="100%"
                    gridArea="sidenav"
                    display={{ base: 'none', lg: 'block' }}
                    pl="6"
                    style={{ contain: 'paint' }}
                >
                    <VStack
                        alignItems="end"
                        position="sticky"
                        py="4"
                        pr="6"
                        top="14"
                        borderRight="1px"
                        borderColor={isScrolled ? 'transparent' : 'gray.800'}
                        overflow="hidden"
                        transition="border-color 300ms"
                    >
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
                        overflowX="hidden"
                    >
                        <Box as="section" animation={` ${slideIn('left')} 1500ms ease-out`}>
                            <Text fontSize={{ base: 'sm', md: 'lg' }} mb="2">
                                Hi, I&apos;m
                            </Text>
                            <Heading size="2xl" whiteSpace="nowrap" mb="1">
                                Nick Meriano
                            </Heading>
                            <Text
                                fontSize={{ base: 'md', md: 'xl' }}
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

                        <Box
                            borderRadius="full"
                            _hover={{
                                '> :nth-child(1)': {
                                    display: 'none'
                                },
                                '> :nth-child(2)': {
                                    display: 'inline-block'
                                }
                            }}
                            opacity="0"
                            animation={` ${fadeIn} 1500ms 1.5s ease-out forwards`}
                        >
                            <Avatar
                                border="2px solid var(--chakra-colors-gray-300)"
                                size={{ base: 'xl', md: '2xl' }}
                                src="https://www.nickmeriano.com/static/43da40990a73c2290eeada7980c22078/59139/profile-img.png"
                            ></Avatar>
                            <Avatar
                                border="2px solid var(--chakra-colors-gray-300)"
                                size={{ base: 'xl', md: '2xl' }}
                                src="https://avatars.githubusercontent.com/u/47791568?s=400&u=6762e302631a56b0f530f6f649fd6172caf650ba&v=4"
                                display="none"
                            ></Avatar>
                        </Box>
                    </Stack>
                    <Box
                        as="section"
                        data-section="about"
                        opacity={isScrolled ? 1 : 0}
                        pointerEvents={isScrolled ? 'all' : 'none'}
                        transition="opacity 300ms"
                        fontSize="lg"
                        id="about"
                        pt="32"
                    >
                        <Tabs colorScheme="gray" variant="solid-rounded" size={{ base: 'sm', md: 'md' }}>
                            <HStack align="center" spacing="0" justify="space-between" mb="4" wrap="wrap" gap="4">
                                <Heading size="lg" whiteSpace="nowrap" mr="8">
                                    About Me
                                </Heading>
                                <TabList
                                    mb="6"
                                    flex={[1, 'unset']}
                                    sx={{
                                        '> button': {
                                            color: 'text.secondary',
                                            _selected: { bg: 'gray.800', color: 'gray.100' },
                                            flex: [1, 'unset'],
                                            whiteSpace: 'nowrap'
                                        }
                                    }}
                                >
                                    <Tab>Bio</Tab>
                                    <Tab>Tech Stack</Tab>
                                    <Tab>Hobbies</Tab>
                                </TabList>
                            </HStack>
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
                        pointerEvents={isScrolled ? 'all' : 'none'}
                        transition="opacity 300ms"
                        fontSize="lg"
                        pt="32"
                        id="projects"
                    >
                        <Heading size="lg" mb="4">
                            Projects
                        </Heading>
                        <Text mb="6" color="text.secondary">
                            Here are a few things I&apos;ve worked on. You can find more on{' '}
                            <Link isExternal href="https://github.com/nicmeriano">
                                GitHub
                            </Link>
                            .
                        </Text>
                        <VStack wrap="wrap" gap="2" spacing="0" role="group">
                            {projects.map((project) => (
                                <VStack
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
                                    alignItems="start"
                                    spacing="2"
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
                                    <Text fontSize="md" color="text.secondary">
                                        {project.description}
                                    </Text>
                                </VStack>
                            ))}
                        </VStack>
                    </Box>
                    <Box
                        as="section"
                        data-section="contact"
                        opacity={isScrolled ? 1 : 0}
                        pointerEvents={isScrolled ? 'all' : 'none'}
                        transition="opacity 300ms"
                        fontSize="lg"
                        mb="48"
                        id="contact"
                        pt="32"
                    >
                        <Heading size="lg" mb="6">
                            {' '}
                            Let&apos;s Connect
                        </Heading>
                        <VStack alignItems="start" letterSpacing="wide">
                            <Text color="text.secondary">
                                Looking to hire a frontend engineer, chat about web development or just want to say hi?
                                Whatever it is, feel free to shoot me an email at{' '}
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
