import { Container, VStack } from '@chakra-ui/react'
import Layout from 'components/Layout'

function HistoryResults() {}

export default function History() {
    return (
        <Layout title="History">
            <Container>
                <VStack spacing={4} align="stretch">
                    <HistoryResults />
                </VStack>
            </Container>
        </Layout>
    )
}
