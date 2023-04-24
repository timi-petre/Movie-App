import {
	Box,
	Card,
	CardBody,
	Center,
	Container,
	Heading,
	Progress,
	SimpleGrid,
	Tag,
} from '@chakra-ui/react';
import Layout from 'components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import { buildImageUrl } from 'utils/api';
import HistoryMovie from './history/history';
import TopRatedMovie from './more/top_rated';
import WatchlistMovie from './watchlist/watchlist';

function PopularMovie() {
	const popular = useSWR('/api/movies/popular');
	const movies = popular.data?.results;
	if (!movies) {
		return <Progress size="xs" isIndeterminate />;
	}
	return (
		<SimpleGrid
			spacing={8}
			columns={5}
			// templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
			mt="5"
		>
			{' '}
			{movies.map((movie) => (
				<Card maxW="sm" key={movie.id}>
					<CardBody alignContent="space-between" textAlign="center">
						{' '}
						<Link href={`/movies/${movie.id}`} passHref legacyBehavior>
							<Image
								src={buildImageUrl(
									movie.poster_path === null
										? '/iYBfBk1i9zjN9Vybbj8UgTYzkyv.jpg'
										: movie.poster_path,
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
						<Box mt="5">
							<Tag colorScheme="purple" variant="solid" mr="2">
								{movie.title}
							</Tag>
							<Tag>{movie.vote_average}</Tag>
						</Box>
					</CardBody>
				</Card>
			))}
		</SimpleGrid>
	);
}

export default function Home() {
	return (
		<Layout title="Moviebase">
			<Center>
				<Card
					direction={{ base: 'column', sm: 'row' }}
					overflow="hidden"
					variant="outline"
					w="max-content"
					border="2px"
					textAlign="center"
				>
					<Container mb="5">
						<Heading as="h4" size="md" my="5">
							Movies
						</Heading>
						<PopularMovie />
					</Container>
				</Card>
			</Center>
			<Center>
				<Card
					direction={{ base: 'column', sm: 'row' }}
					overflow="hidden"
					variant="outline"
					w="max-content"
					border="2px"
					textAlign="center"
					my="5"
				>
					<Container mb="5">
						<Heading as="h4" size="md" my="5">
							History
						</Heading>
						<HistoryMovie />
					</Container>
				</Card>
			</Center>
			<Center>
				<Card
					direction={{ base: 'column', sm: 'row' }}
					overflow="hidden"
					variant="outline"
					w="max-content"
					border="2px"
					textAlign="center"
					my="5"
				>
					<Container mb="5">
						<Heading as="h4" size="md" my="5">
							Watchlist
						</Heading>
						<WatchlistMovie />
					</Container>
				</Card>
			</Center>
			<Center>
				<Card
					direction={{ base: 'column', sm: 'row' }}
					overflow="hidden"
					variant="outline"
					w="max-content"
					border="2px"
					textAlign="center"
					my="5"
				>
					<Container mb="10">
						<Heading as="h4" size="md" my="5">
							Top Rated
						</Heading>
						<TopRatedMovie />
					</Container>
				</Card>
			</Center>
		</Layout>
	);
}
