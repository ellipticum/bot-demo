import styles from './styles.module.scss'
import Bots from '../Bots'
import Feed from '../Feed'

const Wrapper = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <Feed />
                <Bots />
            </div>
        </div>
    )
}

export default Wrapper
