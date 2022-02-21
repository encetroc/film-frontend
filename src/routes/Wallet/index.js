import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Row, Toolbar } from 'primitives'
import { GET_SHAREHOLDER_TRANSFERS } from 'gql/queries'
import styles from './Wallet.module.css'
import { ListDisplay } from 'components'
import { useMemo } from 'react'

export function Wallet() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, data } = useQuery(GET_SHAREHOLDER_TRANSFERS, {
    variables: { id },
    partialRefetch: true,
  })
  const totalAmount = useMemo(() => {
    if (loading) {
      return 0
    }
    let total = 0
    data?.shareholderTransfers.forEach((transfer) => (total += transfer.amount))
    return total
  }, [data?.shareholderTransfers, loading])
  function displayFn(item) {
    return `- ${item.id}: ${item.amount} €`
  }
  function formatTitle(shareholder, movie) {
    return `${shareholder.firstName} ${shareholder.lastName}: (movie: ${movie.title})`
  }
  if (data && data.shareholderTransfers.length === 0)
    return (
      <Toolbar>
        <button onClick={() => navigate('/')} className={styles.backBtn}>
          back
        </button>
        No transaction for this shareholder yet
      </Toolbar>
    )
  return (
    <>
      {loading && <span>Loading...</span>}
      {data && data.shareholderTransfers[0] && (
        <>
          <Toolbar>
            <button onClick={() => navigate('/')} className={styles.backBtn}>
              back
            </button>
            {formatTitle(
              data?.shareholderTransfers[0].shareholder,
              data?.shareholderTransfers[0].movie
            )}
          </Toolbar>
          <div className={styles.wallet}>
            <div className={styles.wallet__card}>
              <Row className={styles.wallet__total}>
                Total:
                <span className={styles.wallet__amount}>{totalAmount}€</span>
              </Row>
              <ListDisplay
                data={data}
                loading={loading}
                displayFn={displayFn}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}
