import {
    Box,
    Card,
    CardBody,
    Container,
    Heading,
    Progress,
    SimpleGrid,
    Tag,
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { buildImageUrl } from 'utils/api'
import HistoryMovie from './history/history'
import Recommended from './more/recommended'
import WatchlistMovie from './watchlist/watchlist'

function PopularMovie() {
    const popular = useSWR('/api/movies/popular')
    const movies = popular.data?.results
    if (!movies) {
        return <Progress size="xs" isIndeterminate />
    }
    return (
        <SimpleGrid
            spacing={8}
            columns={5}
            // templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            mt="5"
        >
            {' '}
            {movies.map((movie) => (
                <Card maxW="sm" key={movie.id}>
                    <CardBody alignContent="space-between" textAlign="center">
                        {' '}
                        <Link
                            href={`/movies/${movie.id}`}
                            passHref
                            legacyBehavior
                        >
                            <Image
                                src={buildImageUrl(
                                    movie.poster_path === null
                                        ? '/iYBfBk1i9zjN9Vybbj8UgTYzkyv.jpg'
                                        : movie.poster_path,
                                    'w500',
                                )}
                                alt="Movie poster"
                                layout="responsive"
                                width="100"
                                height="395"
                                objectFit="contain"
                                borderRadius="lg"
                                unoptimized="true"
                                style={{ cursor: 'pointer' }}
                            />
                        </Link>
                        <Box mt="5">
                            <Tag colorScheme="purple" variant="solid" mr="2">
                                {movie.title}
                            </Tag>
                            <Tag>{movie.vote_average}</Tag>
                        </Box>
                    </CardBody>
                </Card>
            ))}
        </SimpleGrid>
    )
}

export default function Home({ series }) {
    return (
        <Layout title="Moviebase">
            <Container mb="5">
                <Heading as="h4" size="md">
                    Movies
                </Heading>
                <PopularMovie />
            </Container>
            <Container mb="5">
                <Heading as="h4" size="md">
                    History
                </Heading>
                <HistoryMovie />
            </Container>
            <Container mb="5">
                <Heading as="h4" size="md">
                    Watchlist
                </Heading>
                <WatchlistMovie />
            </Container>
            <Container mb="10">
                <Heading as="h4" size="md">
                    Recommended
                </Heading>
                <Recommended />
            </Container>
        </Layout>
    )
}
