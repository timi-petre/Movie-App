import {
    Badge,
    Box,
    Container,
    Heading,
    HStack,
    Stack,
    Tag,
    VStack,
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { buildImageUrl } from 'utils/api'

function Watch() {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id && `/api/history/{id}`)

    if (error) {
        return (
            <div>
                Error fetching movie with ID {id}: {JSON.stringify(error)}
            </div>
        )
    }

    return (
        <Stack direction={['column', 'row']} spacing={4}>
            <Box minW="300px" pos="relative">
                <Image
                    src={buildImageUrl(data?.poster_path, 'w300')}
                    alt="Movie poster"
                    title={data?.title}
                    layout="responsive"
                    width="300"
                    height="450"
                    objectFit="contain"
                    unoptimized
                />
            </Box>
            <Stack>
                <HStack justify="space-between">
                    <Heading as="h2">{data?.title}</Heading>
                    <Box>
                        <Tag colorScheme="purple" variant="solid">
                            {data?.release_date}
                        </Tag>
                    </Box>
                </HStack>
                <Box>{data?.tagline}</Box>
                <Stack direction="row">
                    {data?.genres?.map((genre) => (
                        <Badge
                            key={genre.id}
                            colorScheme="purple"
                            variant="outline"
                        >
                            {genre.name}
                        </Badge>
                    ))}
                </Stack>
                <Box>{data?.overview}</Box>

                <Box>
                    <Tag colorScheme="purple" variant="solid">
                        {data?.status}
                    </Tag>
                    <Tag title="Popularity">{data?.popularity}</Tag>
                </Box>
            </Stack>
        </Stack>
    )
}

export default function Watchlist() {
    return (
        <Layout title="Watchlist">
            <Container>
                <VStack spacing={4} align="stretch">
                    <Watch />
                </VStack>
            </Container>
        </Layout>
    )
}
