/* eslint-disable react/jsx-key */
import { Container, createIcon, Flex, Link, Stack, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import NextLink from 'next/link';

const Logo = createIcon({
    displayName: 'Logo',
    path: [
        <path d="M5.13692 8.38628L0.71875 19.44H4.88588L6.94993 13.5037L5.13692 8.38628Z" fill="#E2E8F0" />,
        <path d="M8.72927 8.38628L6.94993 13.5037L9.05302 19.44L10.769 14.363L8.72927 8.38628Z" fill="#4A5568" />,
        <path d="M8.72927 8.38628H5.13692L6.94993 13.5037L8.72927 8.38628Z" fill="#4A5568" />,
        <path d="M9.05302 19.44H12.5017L10.769 14.363L9.05302 19.44Z" fill="#EDF2F7" />,
        <path d="M15.848 9.24822L14.0823 4.56L10.769 14.363L12.5017 19.44L15.848 9.24822Z" fill="#EDF2F7" />,
        <path d="M17.3873 4.56H14.0823L15.848 9.24822L17.3873 4.56Z" fill="#718096" />,
        <path d="M23.2787 19.44L17.3873 4.56L15.848 9.24822L19.6864 19.44H23.2787Z" fill="#718096" />
    ]
});

const Home: NextPage = () => {
    return (
        <Stack direction={{ base: 'column', md: 'row' }} height="full" maxWidth="5xl" marginX="auto">
            <Container height={{ md: 'full' }} py="12" centerContent width="full" justifyContent="center">
                <Flex direction="column" alignItems="center">
                    <Logo boxSize="16" />

                    <Text as="h1" textTransform="uppercase" fontWeight="medium" fontSize="4xl" letterSpacing="wide">
                        Nick Meriano
                    </Text>
                    <Text as="h2" textTransform="uppercase" fontSize="md">
                        Software engineer at{' '}
                        <Text as="b" textTransform="none">
                            Ephesoft
                        </Text>
                    </Text>
                </Flex>
            </Container>
            <Container height="100%" width="full" justifyContent="center" centerContent alignItems="start">
                <Flex
                    alignItems="start"
                    direction="column"
                    position="relative"
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        marginY: 'auto',
                        right: 'calc(100% + var(--chakra-space-8))',
                        height: '75%',
                        width: '1px',
                        background: 'gray.700',
                        display: 'block'
                    }}
                >
                    <Text as="h3" textTransform="uppercase" fontWeight="medium" fontSize="2xl">
                        Posts
                    </Text>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            5 tips to overcome imposter syndrome
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            Is Angular still worth learning in 2022?
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            How to center a div
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link mt="1" fontSize="md" fontWeight="medium" color="gray.200" _hover={{ color: 'teal.300' }}>
                            See all posts
                        </Link>
                    </NextLink>
                    <Text as="h3" textTransform="uppercase" fontWeight="medium" fontSize="2xl" mt="6">
                        Open Source
                    </Text>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            nickmeriano.com
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            ResuMD
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            ThreeJS Particles
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link mt="1" fontSize="md" fontWeight="medium" color="gray.200" _hover={{ color: 'teal.300' }}>
                            More on GitHub
                        </Link>
                    </NextLink>
                    <Text as="h3" textTransform="uppercase" fontWeight="medium" fontSize="2xl" mt="6">
                        Misc
                    </Text>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            Code snippets
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            Resources
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            Travel log
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            About me
                        </Link>
                    </NextLink>
                    <Text as="h3" textTransform="uppercase" fontWeight="medium" fontSize="2xl" mt="6">
                        Links
                    </Text>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            LinkedIn
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            GitHub
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            CodePen
                        </Link>
                    </NextLink>
                    <NextLink href="#" passHref>
                        <Link fontSize="lg" fontWeight="medium" color="gray.300" _hover={{ color: 'teal.300' }}>
                            Dribble
                        </Link>
                    </NextLink>
                </Flex>
            </Container>
        </Stack>
    );
};

export default Home;
