import {
  CreateMovie,
  MoviesList,
  CreateShareholder,
  ShareholdersList,
  TransfersList,
  CreateTransfer,
} from 'components'
import { Toolbar } from 'primitives'
import styles from './Admin.module.css'

export function Admin() {
  return (
    <>
      <Toolbar>Admin</Toolbar>
      <div className={styles.panel}>
        <div className={styles.panel__content}>
          <div className={styles.panel__title}>Movies</div>
          <CreateMovie />
          <MoviesList />
        </div>
        <div className={styles.panel__content}>
          <div className={styles.panel__title}>Shareholders</div>
          <CreateShareholder />
          <ShareholdersList />
        </div>
        <div className={styles.panel__content}>
          <div className={styles.panel__title}>Transfers</div>
          <CreateTransfer />
          <TransfersList />
        </div>
      </div>
    </>
  )
}
