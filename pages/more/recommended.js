import { Card, Center, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { buildImageUrl } from 'utils/api'

const Recommended = ({ id }) => {
    const { data, error } = useSWR(id && `/api/more/moreto`)
    if (error) {
        return <Center h="full">An error has occured</Center>
    }

    // if (!data) {
    //     return <Progress size="xs" isIndeterminate />
    // }
    if (!data?.results.length) {
        return <Text>No results</Text>
    }
    return (
        <>
            {' '}
            <SimpleGrid spacing={8} columns={5} mt="5">
                {data.results?.length > 0 ? (
                    data.results.map((movie) => (
                        <Card
                            direction={{
                                base: 'column',
                                sm: 'row',
                            }}
                            overflow="hidden"
                            variant="outline"
                            key={movie.id}
                            w={[300, 400, 500]}
                            border="2px"
                        >
                            <Link href={`/movies/${movie.id}`}>
                                <Image
                                    objectFit="cover"
                                    maxW={{ base: '100%', sm: '200px' }}
                                    src={buildImageUrl(movie.poster_path)}
                                    alt="Movie poster"
                                    layout="responsive"
                                    maxH="225"
                                />
                            </Link>
                        </Card>
                    ))
                ) : (
                    <Heading>Nothing...</Heading>
                )}
            </SimpleGrid>
        </>
    )
}

export default Recommended
