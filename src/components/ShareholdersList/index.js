import { useQuery } from '@apollo/client'
import { GET_SHAREHOLDERS } from 'gql/queries'
import { ListDisplay } from 'components'

export function ShareholdersList() {
  const { loading, data } = useQuery(GET_SHAREHOLDERS)
  function displayFn(item) {
    return `${item.firstName} ${item.lastName} (movie: ${item.movie.title})`
  }
  return (
    <ListDisplay
      loading={loading}
      data={data}
      displayFn={displayFn}
      canNavigate={true}
    />
  )
}
