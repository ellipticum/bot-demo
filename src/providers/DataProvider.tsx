import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IBot } from '../shared/interfaces/bot'
import { LayoutProps } from '../shared/interfaces/layoutProps'
import { createContextHook } from '../shared/helpers/createContextHook'
import data from '../../public/data.json'
import { IData } from '../shared/interfaces/data.ts'

export type Range = '24h' | '7d' | '30d' | '60d' | '90d' | 'all_time'

interface IDataContext {
    bot: IBot | null
    setBot: Dispatch<SetStateAction<IBot | null>>
    range: Range
    setRange: Dispatch<SetStateAction<Range>>
    bots: IBot[] | null
    setBots: Dispatch<SetStateAction<IBot[] | null>>
    balance: number | null
    setBalance: Dispatch<SetStateAction<number | null>>
    onHold: number | null
    setOnHold: Dispatch<SetStateAction<number | null>>
    tradingCapital: number | null
    setTradingCapital: Dispatch<SetStateAction<number | null>>
    tradingCapitalCurrency: 'eth' | 'btc' | null
    setTradingCapitalCurrency: Dispatch<SetStateAction<'eth' | 'btc' | null>>
}

const DataContext = createContext<IDataContext | undefined>(undefined)

export const useData = createContextHook(DataContext)

const DataProvider: FC<LayoutProps> = ({ children }) => {
    const [bot, setBot] = useState<IBot | null>(null)
    const [range, setRange] = useState<Range>('24h')
    const [bots, setBots] = useState<IBot[] | null>(null)
    const [balance, setBalance] = useState<number | null>(null)
    const [onHold, setOnHold] = useState<number | null>(null)
    const [tradingCapital, setTradingCapital] = useState<number | null>(null)
    const [tradingCapitalCurrency, setTradingCapitalCurrency] = useState<'eth' | 'btc' | null>(null)

    useEffect(() => {
        const { bots, balance, on_hold, trading_capital, trading_capital_currency } = data as IData

        const savedBot = localStorage.getItem('bot')
        const savedRange = localStorage.getItem('range')

        console.log('SAVED BOT', savedBot)
        console.log('SAVED RANGE', savedRange)

        setBot(savedBot ? JSON.parse(savedBot) : bots[0])
        setRange(savedRange ? JSON.parse(savedRange) : '24h')

        setBots(bots)
        setBalance(balance)
        setOnHold(on_hold)
        setTradingCapital(trading_capital)
        setTradingCapitalCurrency(trading_capital_currency)
    }, [])

    useEffect(() => {
        if (!bot) {
            return
        }

        localStorage.setItem('bot', JSON.stringify(bot))
    }, [bot])

    useEffect(() => {
        if (range === '24h') {
            return
        }

        localStorage.setItem('range', JSON.stringify(range))
    }, [range])

    return (
        <DataContext.Provider
            value={{
                bots,
                setBots,
                balance,
                setBalance,
                onHold,
                setOnHold,
                tradingCapital,
                setTradingCapital,
                tradingCapitalCurrency,
                setTradingCapitalCurrency,
                bot,
                setBot,
                range,
                setRange
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
