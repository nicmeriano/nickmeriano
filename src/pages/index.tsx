import {
    Avatar,
    Box,
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
import { Icon, Project, SideNav } from 'components';
import { projects } from 'data';
import { useIsWindowScrolled } from 'hooks';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fadeIn, slideIn } from 'theme';

const Home: NextPage = () => {
    const [activeSection, setActiveSection] = useState<string>();
    const isWindowScrolled = useIsWindowScrolled();

    useEffect(() => {
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
            <Box id="header" position="fixed" width="full" h="24px"></Box>
            <Box
                position="fixed"
                zIndex="overlay"
                bottom="0"
                left="0"
                width="full"
                h="8"
                bg="linear-gradient(180deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"
                opacity={isWindowScrolled ? '1' : '0'}
                transition="opacity 300ms"
                pointerEvents="none"
            ></Box>
            <Box
                position="fixed"
                zIndex="overlay"
                top="0"
                left="0"
                width="full"
                h="8"
                bg="linear-gradient(0deg,hsla(0,0%,8%,0), var(--chakra-colors-gray-900))"
                opacity={isWindowScrolled ? '1' : '0'}
                transition="opacity 300ms"
                pointerEvents="none"
            ></Box>
            <Grid
                gridTemplateAreas={{ base: `'main main'`, lg: `'sidenav main'` }}
                gridTemplateColumns="1fr 2fr"
                mx="auto"
                width="full"
                maxWidth={{ base: 'lg', md: '2xl', lg: '5xl' }}
                pt={{ base: '10vh', lg: '30vh' }}
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
                    <SideNav isExpanded={isWindowScrolled} activeLink={activeSection} />
                </GridItem>
                <GridItem w="full" h="full" p="6" pt="0" pb="85vh" gridArea="main">
                    <Stack
                        justify="space-between"
                        align="start"
                        gap="12"
                        maxWidth="lg"
                        direction={{ base: 'column-reverse', sm: 'row' }}
                        overflowX="hidden"
                    >
                        <Box
                            as="section"
                            animation={{ base: '', lg: `${slideIn('left')} 1500ms cubic-bezier(0.15, 1, 0.3, 1)` }}
                        >
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
                            opacity={{ base: 1, lg: 0 }}
                            animation={{ base: '', lg: ` ${fadeIn} 1s 1s ease-out forwards` }}
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

                    <VStack
                        alignItems="start"
                        spacing="32"
                        mt="24"
                        opacity={{ base: 1, lg: isWindowScrolled ? 1 : 0 }}
                        transition="opacity 300ms"
                    >
                        <Box
                            as="section"
                            data-section="about"
                            pointerEvents={isWindowScrolled ? 'all' : 'none'}
                            fontSize="lg"
                            id="about"
                            pt="16"
                        >
                            <Tabs colorScheme="gray" variant="solid-rounded" size="md">
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
                                <TabPanels minHeight="275px" color="text.secondary">
                                    <TabPanel px="0" pb="0">
                                        <VStack alignItems="start">
                                            <Text>
                                                Hey, I&apos;m Nick. I&apos;m a software engineer at{' '}
                                                <Link isExternal href="https://ephesoft.com">
                                                    Ephesoft
                                                </Link>
                                                , where my team is building the future of intelligent document
                                                processing and automation.
                                            </Text>
                                            <Text>
                                                Specialized in frontend development, I have an affinity for UI/UX design
                                                and am passionate about building scalable and accessible applications
                                                for the web.
                                            </Text>
                                            <Text> Currently based in the Bay Area, CA.</Text>
                                        </VStack>
                                    </TabPanel>
                                    <TabPanel px="0">
                                        <VStack alignItems="start">
                                            <Text>
                                                The technologies that I typically use on a daily basis include{' '}
                                                <Link isExternal href="https://google.com">
                                                    Angular
                                                </Link>
                                                ,{' '}
                                                <Link isExternal href="https://google.com">
                                                    RxJS
                                                </Link>
                                                ,{' '}
                                                <Link isExternal href="https://google.com">
                                                    Typescript
                                                </Link>
                                                ,{' '}
                                                <Link isExternal href="https://google.com">
                                                    Figma
                                                </Link>{' '}
                                                and{' '}
                                                <Link isExternal href="https://google.com">
                                                    Storybook
                                                </Link>
                                                . I love{' '}
                                                <Link isExternal href="https://google.com">
                                                    Cypress
                                                </Link>{' '}
                                                for e2e testing and use{' '}
                                                <Link isExternal href="https://google.com">
                                                    Jasmine
                                                </Link>{' '}
                                                and{' '}
                                                <Link isExternal href="https://google.com">
                                                    Mocha
                                                </Link>{' '}
                                                for unit tests.
                                            </Text>
                                            <Text>
                                                When it comes to the backend and infrastructure I&apos;m most familiar
                                                with{' '}
                                                <Link isExternal href="https://google.com">
                                                    NodeJS
                                                </Link>
                                                ,{' '}
                                                <Link isExternal href="https://google.com">
                                                    AWS
                                                </Link>{' '}
                                                (Lambda, S3, DynamoDB) and{' '}
                                                <Link isExternal href="https://google.com">
                                                    Bitbucket Pipelines
                                                </Link>
                                                .
                                            </Text>
                                            <Text>
                                                Tooling wise I use{' '}
                                                <Link isExternal href="https://google.com">
                                                    VS Code
                                                </Link>
                                                ,{' '}
                                                <Link isExternal href="https://google.com">
                                                    Jira
                                                </Link>{' '}
                                                and most important of all,{' '}
                                                <Link isExternal href="https://google.com">
                                                    Google
                                                </Link>
                                                .
                                            </Text>
                                            <Text>
                                                Outside of work I like to dabble in other technologies such as ReactJS
                                                and ThreeJS.
                                            </Text>
                                        </VStack>
                                    </TabPanel>
                                    <TabPanel px="0">
                                        <VStack alignItems="start">
                                            <Text>
                                                When not in the office I&apos;me most likely to be found enjoying the
                                                outdoors, whether that be hiking, playing tennis or at my favorite
                                                coffee shop down the street.
                                            </Text>
                                            <Text>
                                                I&apos;m also big into travel and love visiting new places around the
                                                world, some of my favorite being Portugal and the Netherlands.
                                            </Text>
                                        </VStack>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                        <Box
                            as="section"
                            data-section="projects"
                            pointerEvents={isWindowScrolled ? 'all' : 'none'}
                            transition="opacity 300ms"
                            fontSize="lg"
                            pt="16"
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
                            <VStack spacing="3" role="group">
                                {projects.map((project) => (
                                    <Project project={project} key={project.name} />
                                ))}
                            </VStack>
                        </Box>
                        <Box
                            as="section"
                            data-section="contact"
                            pointerEvents={isWindowScrolled ? 'all' : 'none'}
                            transition="opacity 300ms"
                            fontSize="lg"
                            mb="48"
                            id="contact"
                            pt="16"
                        >
                            <Heading size="lg" mb="6">
                                {' '}
                                Let&apos;s Connect
                            </Heading>
                            <VStack alignItems="start" letterSpacing="wide">
                                <Text color="text.secondary">
                                    Looking to hire a frontend engineer, chat about web development or just want to say
                                    hi? Whatever it is, feel free to shoot me an email at{' '}
                                    <Link href="mailto:nicmeriano@gmail.com">nicmeriano@gmail.com</Link> and I&apos;ll
                                    get back to you as soon as I can.
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>
                </GridItem>
            </Grid>
        </>
    );
};

export default Home;
