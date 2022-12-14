import { Card, Center, CircularProgress, Wrap } from '@chakra-ui/react'
import Movie from 'components/HistoryLayout'
import Layout from 'components/Layout'
import useSWR from 'swr'

export const HistoryContent = () => {
    const { data, error } = useSWR(`/api/history/histories`)

    if (error) {
        return <Center h="full">An error occured</Center>
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
            <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow="hidden"
                variant="outline"
            >
                {data.length > 0 ? (
                    data.map(({ data }) => <Movie key={data.id} data={data} />)
                ) : (
                    <div>Your history is empty</div>
                )}
            </Card>
        </>
    )
}
export default function History() {
    return (
        <Layout title="History">
            <Wrap spacing="50px" justify="center">
                <HistoryContent />
            </Wrap>
        </Layout>
    )
}
