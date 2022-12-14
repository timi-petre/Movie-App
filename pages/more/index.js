import { Container, Progress } from '@chakra-ui/react'
import Layout from 'components/Layout'
import Morelayout from 'components/Morelayout'
import useSWR from 'swr'
export const Watch = () => {
    const { data } = useSWR(`/api/more/moreto`)
    if (!data) {
        return <Progress size="xs" isIndeterminate />
    }

    return <Morelayout id={data.id} title={data.title} />
}

export default function More() {
    return (
        <Layout title="More to watch">
            <Container h="full">
                <Watch />
            </Container>
        </Layout>
    )
}
