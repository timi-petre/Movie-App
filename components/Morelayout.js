import {
    Card,
    CardBody,
    Center,
    CircularProgress,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    Wrap,
} from '@chakra-ui/react'
import useSWR from 'swr'
import { buildImageUrl } from 'utils/api'
import HistoryButton from './HistoryButton'
import WatchlistButton from './WatchlistButton'

const More = ({ id, title }) => {
    const { data, error } = useSWR(id && `/api/more/${id}`)

    if (error) {
        return <Text color="red">An error occured</Text>
    }

    if (!data) {
        return (
            <Center h="full">
                <CircularProgress isIndeterminate />
            </Center>
        )
    }
    if (!data?.results.length) {
        return <Text>No results</Text>
    }
    return (
        <>
            {title ? (
                <Heading mb="5">
                    Because you watched{' '}
                    <Text as="span" color="grey">
                        {title}
                    </Text>
                </Heading>
            ) : (
                <Heading>Our recommendations</Heading>
            )}
            <Wrap spacing="30px" justify="space-evenly">
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
                            <CardBody w={[300, 400, 500]}>
                                <Heading size="md">{movie.title}</Heading>
                                <Text>{movie.release_date}</Text>
                                <Text>Rating: {movie.vote_average}</Text>
                                <Stack direction="row">
                                    <HistoryButton rem={movie.id} />
                                    <WatchlistButton rem={movie.id} />
                                </Stack>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Heading>Nothing...</Heading>
                )}
            </Wrap>
        </>
    )
}

export default More
