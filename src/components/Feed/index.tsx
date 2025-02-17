import styles from './styles.module.scss'
import { classNames } from '../../shared/helpers/classNames.ts'
import { useData } from '../../providers/DataProvider.tsx'

const Feed = () => {
    const { onHold, tradingCapital, tradingCapitalCurrency, balance } = useData()

    return (
        <div className={styles.feed}>
            <div className={classNames(styles.item, styles.column)}>
                <span className={styles.name}>trading capital</span>
                <span className={styles.value}>
                    {tradingCapital}{' '}
                    {tradingCapitalCurrency && tradingCapitalCurrency.toUpperCase()}
                </span>
            </div>
            <div className={styles.content}>
                <div className={styles.item}>
                    <span className={styles.name}>balance</span>
                    <span className={classNames(styles.value, styles.small)}>{balance}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.name}>on hold</span>
                    <span className={classNames(styles.value, styles.small)}>{onHold}</span>
                </div>
            </div>
        </div>
    )
}

export default Feed
