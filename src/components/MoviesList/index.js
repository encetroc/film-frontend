import { useQuery } from '@apollo/client'
import { GET_MOVIES } from 'gql/queries'
import { ListDisplay } from 'components'

export function MoviesList() {
  const { loading, error, data } = useQuery(GET_MOVIES)
  function displayFn(item) {
    return `${item.title}`
  }
  return <ListDisplay loading={loading} data={data} displayFn={displayFn} />
}
