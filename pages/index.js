import {
    Box,
    Card,
    CardBody,
    Container,
    Heading,
    SimpleGrid,
    Tag,
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import Image from 'next/image'
import Link from 'next/link'
import { buildImageUrl } from 'utils/api'

function PopularMovie({ movies }) {
    return (
        <SimpleGrid
            spacing={3}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            mt="5"
        >
            {movies?.map((movie) => (
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
                                    'w300',
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
                            <Tag colorScheme="purple" variant="solid">
                                {movie.title}
                            </Tag>
                        </Box>
                    </CardBody>
                </Card>
            ))}
        </SimpleGrid>
    )
}

export default function Home({ movies }) {
    return (
        <Layout title="Moviebase">
            <Container>
                <Heading as="h4" size="md">
                    What&apos;s Popular
                </Heading>

                <PopularMovie movies={movies.results} />
            </Container>
        </Layout>
    )
}
export async function getStaticProps() {
    let movies = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    )
    movies = await movies.json()

    return {
        props: { movies: movies },
    }
}
