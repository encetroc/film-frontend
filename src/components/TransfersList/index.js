import { useQuery } from '@apollo/client'
import { GET_TRANSFERS } from 'gql/queries'
import { ListDisplay } from 'components'

export function TransfersList() {
  const { loading, data } = useQuery(GET_TRANSFERS)
  function displayFn(item) {
    return `${item.movie.title} (amount: ${item.amount}€)`
  }
  return <ListDisplay loading={loading} data={data} displayFn={displayFn} />
}
