import { useNavigate } from 'react-router-dom'
import styles from './ListDisplay.module.css'

export function ListDisplay({ data, loading, displayFn, canNavigate = false }) {
  const navigate = useNavigate()
  return (
    <div>
      {loading && <span>loading</span>}
      {data && Object.keys(data)[0] && (
        <ul className={styles.list}>
          {data[Object.keys(data)[0]].map((item) => (
            <li
              className={styles.list__item}
              key={item.id}
              onClick={() => canNavigate && navigate(`/wallet/${item.id}`)}
            >
              {displayFn(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
