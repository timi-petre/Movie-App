import {
    Badge,
    Box,
    Center,
    CircularProgress,
    Container,
    Heading,
    HStack,
    Stack,
    Tag,
    Text,
    VStack,
} from '@chakra-ui/react'
import HistoryButton from 'components/HistoryButton'
import Layout from 'components/Layout'
import WatchlistButton from 'components/WatchlistButton'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { buildImageUrl } from 'utils/api'

const MovieContent = () => {
    const { id } = useRouter().query
    const { data, error } = useSWR(id && `/api/movies/${id}`)

    if (error) {
        return (
            <Text color="red">
                Error fetching movie with ID {id}: {JSON.stringify(error)}
            </Text>
        )
    }

    if (!data) {
        return (
            <Center h="full">
                <CircularProgress isIndeterminate />
            </Center>
        )
    }
    if (data.success === false) {
        return <Text color="red">{data.status_message}</Text>
    }
    return (
        <Stack direction={['column', 'row']} spacing={4}>
            <Head>
                <title>{data.title}</title>
            </Head>
            <Box minW="300px" pos="relative">
                <VStack pos="absolute" zIndex={1} top={2} right={2}>
                    <HistoryButton />
                    <WatchlistButton />
                </VStack>
                <Image
                    src={buildImageUrl(data.poster_path, 'w300')}
                    alt="Movie poster"
                    title={data.title}
                    layout="responsive"
                    width="300"
                    height="450"
                    objectFit="contain"
                    unoptimized
                />
            </Box>
            <Stack>
                <HStack justify="space-between">
                    <Heading as="h2">{data.title}</Heading>
                    <Box>
                        <Tag colorScheme="purple" variant="solid">
                            {!data.release_date ? 'Unknown' : data.release_date}
                        </Tag>
                    </Box>
                </HStack>
                <Box>{data.tagline}</Box>
                <Stack direction="row">
                    {data.genres?.map((genre) => (
                        <Badge
                            key={genre.id}
                            colorScheme="purple"
                            variant="outline"
                        >
                            {genre.name}
                        </Badge>
                    ))}
                </Stack>
                <Box>{data.overview}</Box>

                <Box></Box>
                <Stack>
                    <HStack justify="space-between">
                        <Box>
                            {' '}
                            <Tag colorScheme="purple" variant="solid" mr="2">
                                {data.status}
                            </Tag>
                            <Tag title="Votes">{data.vote_count} 👍</Tag>
                        </Box>
                        <Box>
                            <Tag colorScheme="purple" variant="solid">
                                {data.original_language.toUpperCase()}
                            </Tag>
                        </Box>
                    </HStack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default function Movie() {
    return (
        <Layout>
            <Container h="full">
                <MovieContent />
            </Container>
        </Layout>
    )
}
