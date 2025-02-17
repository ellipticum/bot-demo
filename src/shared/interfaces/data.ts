import { IBot } from './bot.ts'

export interface IData {
    trading_capital: number
    trading_capital_currency: 'eth' | 'btc'
    balance: number
    on_hold: number
    bots: IBot[]
}
