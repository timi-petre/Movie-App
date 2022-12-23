import {
    Card,
    CardBody,
    Heading,
    HStack,
    Image,
    Input,
    Link,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import HistoryButton from 'components/HistoryButton';
import WatchlistButton from 'components/WatchlistButton';
import Moment from 'moment';

import { buildImageUrl } from 'utils/api';
const HistoryLayout = ({ data, date }) => {
    return (
        <>
            <SimpleGrid
                spacing={8}
                // columns={5}
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
                m="5"
            >
                <Card
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    overflow="hidden"
                    variant="outline"
                    w={[300, 400, 600]}
                    border="2px"
                    borderColor="gray.200"
                >
                    {' '}
                    <HStack
                        spacing="10px"
                        justify="space-evenly"
                        pos="absolute"
                        zIndex={1}
                        top={2}
                        right={2}
                    >
                        <Text py="2" px="10" marginRight="5" color="yellow">
                            {Moment(date).format('HH : mm')}{' '}
                        </Text>
                        <VStack pos="absolute" zIndex={1} top={2} right={2}>
                            <HistoryButton rem={data.id} />
                            <WatchlistButton rem={data.id} />
                        </VStack>
                    </HStack>
                    <Link href={`/movies/${data.id}`}>
                        <Image
                            objectFit="cover"
                            maxW={{ base: '100%', sm: '250px' }}
                            src={buildImageUrl(data.poster_path)}
                            alt="Movie poster"
                            layout="responsive"
                            style={{ cursor: 'pointer' }}
                        />
                    </Link>
                    <CardBody>
                        <Heading size="md">{data.title}</Heading>
                        <Text py="2">{data.release_date}</Text>
                        <Text py="2">{data.overview}</Text>
                        <VStack>
                            <HStack>
                                <Text py="2">Date :</Text>
                                <Input
                                    type="date"
                                    value={Moment(date).format('YYYY-MM-DD')}
                                    isReadOnly
                                    w={[300, 400, 150]}
                                />
                            </HStack>
                        </VStack>
                    </CardBody>
                </Card>
            </SimpleGrid>
        </>
    );
};

export default HistoryLayout;
