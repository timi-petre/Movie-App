import { SearchIcon } from '@chakra-ui/icons'
import {
    Badge,
    Button,
    Card,
    CardBody,
    Container,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react'
import Layout from 'components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { buildImageUrl } from 'utils/api'

function SearchBar() {
    const router = useRouter()
    const { terms, pages } = router.query
    const [text, setText] = useState('')
    const [page, setPage] = useState(1)

    // Write a button to go to next page

    // Update text input when route changes (ex when user goes back/forward)
    useEffect(() => {
        setText(terms || '')
    }, [terms])

    // Update router history if a search was performed
    const handleSearch = (event) => {
        event.preventDefault()
        if (text !== terms) {
            router.push(`/search/?terms=${text}&pages=${page}`, undefined, {
                shallow: true,
            })
        }
    }

    return (
        <InputGroup as="form" onSubmit={handleSearch}>
            <Input
                placeholder="Search for a movie..."
                value={text}
                onChange={(event) => setText(event.target.value)}
            />
            <InputRightElement>
                <IconButton
                    aria-label="Search for a movie"
                    icon={<SearchIcon />}
                    type="submit"
                />
            </InputRightElement>
        </InputGroup>
    )
}
function SearchResults() {
    let { terms, pages } = useRouter().query
    const { data, error } = useSWR(
        terms && pages && `/api/search?terms=${terms}&page=${pages}`,
    )
    const [page, setPage] = useState(1)

    if (!terms) {
        return <Text>Type some terms and submit for a quick search</Text>
    }
    if (error) {
        return (
            <Text color="red">
                Error fetching movies for {terms}: {JSON.stringify(error)}
            </Text>
        )
    }
    if (!data) {
        return <Progress size="xs" isIndeterminate />
    }
    if (!data.results.length) {
        return <Text>No results</Text>
    }

    return (
        <>
            <SimpleGrid
                spacing={3}
                templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            >
                {data.results.map(
                    ({ id, title, release_date, poster_path }) => (
                        <Card maxW="sm" key={id}>
                            <CardBody>
                                <Link
                                    href={`/movies/${id}`}
                                    passHref
                                    legacyBehavior
                                >
                                    <Image
                                        src={buildImageUrl(
                                            poster_path === null
                                                ? '/iYBfBk1i9zjN9Vybbj8UgTYzkyv.jpg'
                                                : poster_path,
                                            'w500',
                                        )}
                                        alt="Movie poster"
                                        layout="responsive"
                                        width="100"
                                        height="395px"
                                        objectFit="contain"
                                        borderRadius="lg"
                                        unoptimized="true"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Link>
                                <Link
                                    href={`/movies/${id}`}
                                    passHref
                                    legacyBehavior
                                >
                                    <Button
                                        as="a"
                                        variant="link"
                                        rightIcon={
                                            <Badge>{release_date}</Badge>
                                        }
                                    >
                                        <Text
                                            as="span"
                                            noOfLines={1}
                                            width="180px"
                                        >
                                            {title}
                                        </Text>
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    ),
                )}
            </SimpleGrid>
            <Container textAlign="center">
                {data.page ? (
                    <div>
                        <Text mt="5">
                            Page {data.page} of {data.total_pages}
                        </Text>
                        <Text>{data.id}</Text>
                        <Text>{data.total_results} results</Text>
                        <Link
                            href={`/search?terms=${terms}&pages=${pages}`}
                            passHref
                            legacyBehavior
                        >
                            <Button
                                as="a"
                                // variant="link"
                                colorScheme="teal"
                                variant="solid"
                                mr="5"
                            >
                                <Text as="span" noOfLines={1} width="180px">
                                    Previous Page
                                </Text>
                            </Button>
                        </Link>

                        <Link
                            href={`/search?terms=${terms}&pages=${pages}`}
                            passHref
                            legacyBehavior
                        >
                            <Button
                                as="a"
                                // variant="link"
                                colorScheme="teal"
                                variant="outline"
                            >
                                <Text as="span" noOfLines={1} width="180px">
                                    Next Page
                                </Text>
                            </Button>
                        </Link>
                    </div>
                ) : null}
            </Container>
        </>
    )
}

export default function Search() {
    return (
        <Layout title="Search">
            <Container>
                <VStack spacing={4} align="stretch">
                    <SearchBar />
                    <SearchResults />
                </VStack>
            </Container>
        </Layout>
    )
}
