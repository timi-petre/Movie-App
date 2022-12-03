import { Container, VStack } from '@chakra-ui/react'
import Layout from 'components/Layout'

export default function Watchlist() {
    return (
        <Layout title="Watchlist">
            <Container>
                <VStack spacing={4} align="stretch"></VStack>
            </Container>
        </Layout>
    )
}
