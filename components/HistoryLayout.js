import {
    Card,
    CardBody,
    Heading,
    Image,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react'
import HistoryButton from 'components/HistoryButton'
import WatchlistButton from 'components/WatchlistButton'

import { useSWRConfig } from 'swr'

import { buildImageUrl } from 'utils/api'
const HistoryLayout = ({ data }) => {
    const { mutate } = useSWRConfig()

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
        >
            {' '}
            <VStack pos="absolute" zIndex={1} top={2} right={2}>
                <HistoryButton rem={data.id} />
                <WatchlistButton rem={data.id} />
            </VStack>
            <Link href={`/movies/${data.id}`}>
                <Image
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '200px' }}
                    src={buildImageUrl(data.poster_path)}
                    alt="Movie poster"
                    layout="responsive"
                />
            </Link>
            <CardBody w={[300, 400, 500]}>
                <Heading size="md">{data.title}</Heading>
                <Text py="2">{data.release_date}</Text>

                <Text py="2">{data.overview}</Text>
            </CardBody>
        </Card>
    )
}

export default HistoryLayout
