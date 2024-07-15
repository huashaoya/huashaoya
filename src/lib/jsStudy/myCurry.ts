function myCurry(fn: Function) {
    return function curriedFn(...args: any) {
        if (fn.length > args.length) {
            return function (...args2: any) {
                return curriedFn(...args.concat(...arguments))
            }
        }
        return fn(...args)
    }
}

exports.myCurry=myCurry