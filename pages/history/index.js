import { Center, CircularProgress, Wrap } from '@chakra-ui/react';
import Movie from 'components/HistoryLayout';
import Layout from 'components/Layout';
import useSWR from 'swr';

export const HistoryContent = () => {
    const { data, error } = useSWR(`/api/history/histories`);

    if (error) {
        return <Center h="full">An error occured</Center>;
    }

    if (!data) {
        return (
            <Center h="full">
                <CircularProgress isIndeterminate />
            </Center>
        );
    }

    return (
        <>
            {data.length > 0 ? (
                data.map(({ data, date }) => (
                    <>
                        {' '}
                        <Movie key={data.id} data={data} date={date} />
                    </>
                ))
            ) : (
                <div>Your history is empty</div>
            )}
        </>
    );
};
export default function History() {
    return (
        <Layout title="History">
            <Wrap spacing="50px" justify="center">
                <HistoryContent />
            </Wrap>
        </Layout>
    );
}
