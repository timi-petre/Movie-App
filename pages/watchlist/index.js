import Layout from 'components/Layout'
import useSWR from 'swr'

import {
    Badge,
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
import HistoryButton from 'components/HistoryButton'
import WatchlistButton from 'components/WatchlistButton'
import { buildImageUrl } from 'utils/api'
export const MoviesContent = () => {
    const { data, error } = useSWR(`/api/watchlist/watchlist`)
    if (error) {
        return <Center h="full">An error has occured</Center>
    }

    if (!data) {
        return (
            <Center h="full">
                <CircularProgress isIndeterminate />
            </Center>
        )
    }
    return (
        <>
            {data.length > 0 ? (
                data.map((movie) => (
                    <Card
                        direction={{ base: 'column', sm: 'row' }}
                        overflow="hidden"
                        variant="outline"
                        key={movie.id}
                        w={[300, 400, 500]}
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
                            <Text py="2">{movie.release_date}</Text>
                            <Stack direction="row" flexWrap="wrap" mb="5">
                                {movie.genres?.map((genre) => (
                                    <Badge
                                        key={genre.id}
                                        colorScheme="purple"
                                        variant="outline"
                                    >
                                        {genre.name}
                                    </Badge>
                                ))}
                            </Stack>
                            <Stack direction="row">
                                <HistoryButton rem={movie.id} />
                                <WatchlistButton rem={movie.id} />
                            </Stack>
                        </CardBody>
                    </Card>
                ))
            ) : (
                <div>{data.data}</div>
            )}
        </>
    )
}
export default function Watchlist() {
    return (
        <Layout title="Watchlist">
            <Wrap spacing="30px" justify="space-evenly">
                <MoviesContent />
            </Wrap>
        </Layout>
    )
}
