import { Flex, Heading, HStack, Link, StackDivider, Text } from '@chakra-ui/react';
import { FC } from 'react';

export type Project = {
    name: string;
    description: string;
    stack: string[];
    srcLink?: string;
    demoLink?: string;
};

export type ProjectProps = {
    project: Project;
};

export const Project: FC<ProjectProps> = ({ project: { name, description, stack, srcLink, demoLink } }) => (
    <Flex
        direction="column"
        gap="2"
        p="10"
        w="full"
        borderRadius="md"
        position="relative"
        _groupHover={{
            opacity: { base: 1, lg: 0.5 }
        }}
        bg="gray.800"
        transition="transform 200ms ease-in-out, opacity 200ms"
        _hover={{
            opacity: '1 !important'
        }}
        alignItems="start"
    >
        <HStack spacing="4">
            {stack.map((tech) => (
                <Text
                    key={tech}
                    textTransform="uppercase"
                    fontSize="xs"
                    fontWeight="semibold"
                    letterSpacing="widest"
                    whiteSpace="nowrap"
                >
                    {tech}
                </Text>
            ))}
        </HStack>
        <Heading as="h3" fontSize="2xl" fontWeight="semibold">
            {name}
        </Heading>
        <Text fontSize="md" color="text.secondary">
            {description}
        </Text>
        <HStack fontSize="md" spacing="2" mt="2" divider={<StackDivider borderColor="gray.700" />}>
            {demoLink && (
                <Link isExternal href={demoLink}>
                    Live demo
                </Link>
            )}
            {srcLink && (
                <Link isExternal href={srcLink}>
                    Source code
                </Link>
            )}
        </HStack>
    </Flex>
);
