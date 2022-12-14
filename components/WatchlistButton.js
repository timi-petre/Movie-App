import { SunIcon } from '@chakra-ui/icons'
import { IconButton, Tooltip } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from 'utils/api'

export default function WatchlistButton({ rem }) {
    let { id } = useRouter().query
    if (!id) id = rem
    const { data } = useSWR(`/api/watchlist/${id}`)
    const { mutate } = useSWRConfig()

    return (
        <Tooltip
            label={data?.found ? 'Remove from watchlist' : 'Add to watchlist'}
        >
            <IconButton
                isLoading={!data}
                colorScheme={data?.found ? 'blue' : 'gray'}
                size="sm"
                border="1px"
                onClick={() => {
                    mutate(`/api/watchlist/${id}`, () =>
                        fetcher(`/api/watchlist/${id}`, {
                            method: data.found ? 'DELETE' : 'PUT',
                        }),
                    )
                }}
            >
                <SunIcon />
            </IconButton>
        </Tooltip>
    )
}
