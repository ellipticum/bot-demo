import { useMemo } from 'react'
import { Range, useData } from '../../providers/DataProvider'
import styles from './styles.module.scss'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { classNames } from '../../shared/helpers/classNames.ts'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const generateRandomSplit = (total: number, parts: number): number[] => {
    const cuts = Array.from({ length: parts - 1 }, () => Math.random())
    cuts.sort((a, b) => a - b)

    const splitRatios: number[] = []
    let prev = 0
    for (const cut of cuts) {
        splitRatios.push(cut - prev)
        prev = cut
    }
    splitRatios.push(1 - prev)

    return splitRatios.map((ratio) => parseFloat((ratio * total).toFixed(2)))
}

const rangeMap: Record<Range, string> = {
    '24h': '24 hours',
    '7d': '7 days',
    '30d': '30 days',
    '60d': '60 days',
    '90d': '90 days',
    all_time: 'all time'
}

const Bots = () => {
    const { bots, bot, setBot, range, setRange } = useData()

    const chartData = useMemo(() => {
        if (!bot) return []
        const total = bot[range]
        const parts = 10
        const splitValues = generateRandomSplit(total, parts)
        const labels = Array.from({ length: parts }, (_, i) => `${i + 1}`)
        return labels.map((label, index) => ({
            label,
            value: splitValues[index]
        }))
    }, [bot, range])

    if (!bots) {
        return <div>Loading...</div>
    }

    const data = {
        labels: chartData.map((item) => item.label),
        datasets: [
            {
                label: rangeMap[range],
                data: chartData.map((item) => item.value),
                fill: false,
                borderColor: '#8884d8',
                tension: 0.1
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {},
            y: {}
        }
    }

    const ranges: Array<Range> = ['24h', '7d', '30d', '60d', '90d', 'all_time']

    return (
        <div className={styles.bots}>
            {bot && (
                <div className={styles.botDetails}>
                    <div className={styles.chartWrapper}>
                        <Line height={220} data={data} options={options} />
                    </div>
                </div>
            )}
            <div className={styles.botList}>
                {bots.map((item) => (
                    <div
                        key={item.name}
                        className={classNames(styles.bot, {
                            [styles.active]: bot && item.name === bot.name
                        })}
                        onClick={() => setBot(item)}
                    >
                        <span className={styles.name}>{item.name}</span>
                        <span
                            className={classNames(styles.value, {
                                [styles.negative]: item[range] <= 0
                            })}
                        >
                            {item[range] > 0 ? '+' : ''}
                            {item[range]}
                        </span>
                    </div>
                ))}
            </div>
            <div className={styles.rangeList}>
                <h3 className={styles.rangeHeading}>Time Range:</h3>
                {ranges.map((item) => (
                    <button
                        key={item}
                        className={classNames(styles.range, {
                            [styles.active]: range === item
                        })}
                        onClick={() => setRange(item)}
                    >
                        {rangeMap[item]}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Bots
