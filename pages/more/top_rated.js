import {
    Box,
    Card,
    CardBody,
    Progress,
    SimpleGrid,
    Tag,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { buildImageUrl } from 'utils/api';

function LatestMovie() {
    const top_rated = useSWR('/api/movies/top_rated');
    const movies = top_rated.data?.results;
    if (!movies) {
        return <Progress size="xs" isIndeterminate />;
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
    );
}

export default LatestMovie;
