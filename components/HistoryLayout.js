import {
    Card,
    CardBody,
    Heading,
    Image,
    Link,
    Text,
    VStack,
    Wrap,
} from '@chakra-ui/react'
import HistoryButton from 'components/HistoryButton'
import WatchlistButton from 'components/WatchlistButton'

import { buildImageUrl } from 'utils/api'
const HistoryLayout = ({ data }) => {
    return (
        <>
            <Wrap spacing="30px" justify="space-evenly">
                <Card
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    overflow="hidden"
                    variant="outline"
                    w={[300, 400, 500]}
                    border="2px"
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
            </Wrap>
        </>
    )
}

export default HistoryLayout
