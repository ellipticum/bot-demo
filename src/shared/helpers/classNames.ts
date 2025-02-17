export const classNames = (
    ...args: (string | Record<string, any> | null | undefined)[]
): string => {
    return args
        .reduce<string[]>((acc, arg) => {
            if (!arg) {
                return acc
            }
            if (typeof arg === 'string') {
                acc.push(arg)
            } else if (typeof arg === 'object' && !Array.isArray(arg)) {
                Object.keys(arg).forEach((key) => {
                    if (arg[key]) {
                        acc.push(key)
                    }
                })
            }
            return acc
        }, [])
        .join(' ')
}
