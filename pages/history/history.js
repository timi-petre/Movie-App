import {
    Card,
    Center,
    Link,
    Progress,
    SimpleGrid,
    Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import useSWR from 'swr';
import { buildImageUrl } from 'utils/api';

function HistoryMovie() {
    const { data, error } = useSWR(`/api/history/histories`);

    if (error) {
        return <Center h="full">An error occured</Center>;
    }

    if (!data) {
        return <Progress size="xs" isIndeterminate />;
    }

    return (
        <>
            <SimpleGrid spacing={8} columns={5} mt="5">
                {data?.length > 0 ? (
                    data?.map(({ data }) => (
                        <Card
                            direction={{ base: 'column', sm: 'row' }}
                            overflow="hidden"
                            variant="outline"
                            key={data.id}
                        >
                            <Link href={`/movies/${data.id}`}>
                                <Image
                                    src={buildImageUrl(
                                        data.poster_path === null
                                            ? '/iYBfBk1i9zjN9Vybbj8UgTYzkyv.jpg'
                                            : data.poster_path,
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
                    ))
                ) : (
                    <Text>Your history is empty</Text>
                )}
            </SimpleGrid>
        </>
    );
}

export default HistoryMovie;
