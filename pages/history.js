import {
    Box,
    Center,
    CircularProgress,
    Container,
    Heading,
    HStack,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export function Watch() {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id && `/api/history/{id}`)

    if (error) {
        return (
            <Text color="red">
                Error fetching movie with ID {id}: {JSON.stringify(error)}
            </Text>
        )
    }

    if (!data) {
        return (
            <Center h="full">
                <CircularProgress isIndeterminate />
            </Center>
        )
    }
    if (data.success === false) {
        return <Text color="red">{data.status_message}</Text>
    }

    return (
        <Stack direction={['column', 'row']} spacing={4}>
            <Head>
                <title>{data.title}</title>
            </Head>
            <Box minW="300px" pos="relative"></Box>

            <HStack justify="space-between">
                <Heading as="h2">{data.title}</Heading>
            </HStack>
            <Stack direction="row">
                {data.map((e) => (
                    <Text key={e.id}>{e.title}</Text>
                ))}
            </Stack>
            <Text>{data.id}</Text>
        </Stack>
    )
}

export default function History() {
    return (
        <Layout title="History">
            <Container>
                <VStack spacing={4} align="stretch">
                    <Watch />
                </VStack>
            </Container>
        </Layout>
    )
}
