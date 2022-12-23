import { Card, Center, Progress, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { buildImageUrl } from 'utils/api';

const Recommended = () => {
    const { data, error } = useSWR(`/api/more/{id}`);
    if (error) {
        return <Center h="full">An error has occured</Center>;
    }
    if (!data) {
        return <Progress size="xs" isIndeterminate />;
    }

    return (
        <>
            {' '}
            <SimpleGrid spacing={8} columns={5} mt="5">
                {data?.length > 0 ? (
                    data?.map((movie) => (
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
                    <Text>Please check What to watch! page!</Text>
                )}
            </SimpleGrid>
        </>
    );
};

export default Recommended;
