import { Card, Center, Progress, SimpleGrid } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { buildImageUrl } from 'utils/api'

const WatchlistMovie = () => {
    const { data, error } = useSWR(`/api/watchlist/watchlist`)
    if (error) {
        return <Center h="full">An error has occured</Center>
    }

    if (!data) {
        return <Progress size="xs" isIndeterminate />
    }
    return (
        <>
            {' '}
            <SimpleGrid
                spacing={8}
                columns={5}
                // templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                mt="5"
            >
                {data.map((movie) => (
                    <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow="hidden"
                        variant="outline"
                        key={movie.id}
                    >
                        <Link href={`/movies/${movie.id}`}>
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
                    </Card>
                ))}
            </SimpleGrid>
        </>
    )
}

export default WatchlistMovie
