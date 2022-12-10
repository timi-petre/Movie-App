import { HamburgerIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Container,
    Grid,
    Heading,
    HStack,
    Spacer,
    Stack,
    useDisclosure,
    VStack,
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

const MenuItem = ({ href, children, ...props }) => (
    <Link href={href} passHref legacyBehavior>
        <Button as="a" variant="link" {...props}>
            {children}
        </Button>
    </Link>
)

function Header() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box bg="purple.500">
            <Container>
                <Stack
                    as="nav"
                    direction={['column', , 'row']}
                    justify="space-between"
                    wrap="wrap"
                    py="1.5rem"
                >
                    <HStack justify="space-between">
                        <MenuItem href="/" mr={8}>
                            <Heading size="lg">Moviebase</Heading>
                        </MenuItem>

                        <Box display={['block', , 'none']} onClick={onToggle}>
                            <Button variant="outline">
                                <HamburgerIcon />
                            </Button>
                        </Box>
                    </HStack>

                    <Stack
                        direction={['column', , 'row']}
                        justify="start"
                        align={['start', , 'center']}
                        display={[isOpen ? 'flex' : 'none', , 'flex']}
                        spacing={4}
                    >
                        <MenuItem href="/search">Search</MenuItem>
                        <MenuItem href="/watchlist">Watchlist</MenuItem>
                        <MenuItem href="/history">History</MenuItem>
                    </Stack>

                    <Spacer />

                    <Box display={[isOpen ? 'block' : 'none', , 'block']}>
                        <MenuItem href="/recommend" variant="outline" disabled>
                            What to watch!
                        </MenuItem>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                {title && <title>{title}</title>}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Grid minH="100vh">
                <VStack w="full" align="stretch" spacing={8}>
                    <Header />
                    <Box as="main" h="full">
                        {children}
                    </Box>
                </VStack>
            </Grid>
        </>
    )
}
