import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, SimpleGrid } from 'react'
import { buildImageUrl } from 'utils/api'

function MovieCard({ movie }) {
    return (
        <SimpleGrid
            spacing={3}
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
            <Card maxW="sm" key={movie.id}>
                <CardBody>
                    {' '}
                    <Link href={`/movies/${movie.id}`} passHref legacyBehavior>
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
                            height="395px"
                            objectFit="contain"
                            borderRadius="lg"
                            unoptimized="true"
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>
                    <p>{movie.title}</p>
                </CardBody>
            </Card>
        </SimpleGrid>
    )
}

export default MovieCard
