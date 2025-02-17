import { Context, useContext } from 'react'

export const createContextHook = <T>(context: Context<T>) => {
    return () => {
        const contextValue = useContext(context)
        if (!contextValue) {
            throw new Error(
                `use${context.displayName} must be used within a ${context.displayName}Provider`
            )
        }
        return contextValue
    }
}
