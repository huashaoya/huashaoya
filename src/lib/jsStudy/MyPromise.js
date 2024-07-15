class MyPromise {
    static statusMap = {
        padding: 'padding',
        fullfilled: 'fullfilled',
        rejected: 'rejected'
    }
    static resolve(data) {
        //todo 处理不同参数类型
        if (data instanceof MyPromise) {
            let _resolve, _reject
            let p = new MyPromise((resolve, reject) => {
                _resolve = resolve
                _reject = reject
            })
            data.then(res => {
                _resolve(res)
            }, (res) => {
                _reject(res)
            })
            return p
        }

        let p = new MyPromise(() => { })
        p._resolve(data)
        return p
    }

    data = undefined
    status = MyPromise.statusMap.padding

    thens = []

    constructor(fn) {
        if (!(fn instanceof Function)) {
            throw new Error('传的resolver不是函数')
        }
        try {
            fn(this._resolve.bind(this), this._reject.bind(this))
        } catch (e) {
            this.data = e
            this._setStatus(MyPromise.statusMap.rejected)
        }

    }
    then(resolver, rejecter) {
        let thenPResolve, thenPReject
        let thenP = new MyPromise((resolve, reject) => {
            thenPResolve = resolve
            thenPReject = reject
        })

        //debugger
        //已有状态
        if (this.status !== MyPromise.statusMap.padding) {
            this.runHandle(resolver,rejecter,thenPResolve, thenPReject)
        } else {
            this.thens.push({
                resolver, thenPResolve, rejecter, thenPReject, thenP
            })
        }
        return thenP
    }

    //todo:状态改变后，通知thens
    _resolve(data) {
        this.data = data
        this._setStatus('fullfilled')

    }
    _reject(data) {
        this.data = data
        this._setStatus('rejected')
    }
    _setStatus(status) {
        if (this.status !== MyPromise.statusMap.padding) return
        this.status = status
        //console.log('状态改变')

        this.thens.forEach(element => {
            this.runHandle(element.resolver,element.rejecter,element.thenPResolve,element.thenPReject)
        });

        this.thens = []
    }
    runHandle(resolver,rejecter,thenPResolve,thenPReject) {
        let run
        if (this.status === MyPromise.statusMap.fullfilled) {
            run = resolver
        } else {
            run = rejecter
        }
        try {
            let res = run(this.data)
            if (res instanceof MyPromise) {
                res.then(res => {
                    thenPResolve(res)
                    //debugger
                }, res => {
                    thenPReject(res)
                })
                //console.log(res)
            } else {
                thenPResolve(res)
            }
        } catch (e) {          
            thenPReject(e)
        }
    }
}

let p = new MyPromise((resolve, reject) => {
    //throw new Error()
    //console.log(666)
    resolve(1)
}).then((res) => {
    console.log('then1')
    let ppp = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(res)
        }, 1000)
    })
    return ppp
}).then((res) => {
    console.log('then2')
    let ppp = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(res)
        }, 1000)
    })
    return ppp
}).then((res) => {
    console.log('then3')
    let ppp = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(res)
        }, 1000)
    })
    return ppp
}).then(res => {
    console.log('then5')
    console.log(res)
})
// setTimeout(()=>{
//     console.log(p)
// },1500)
// console.log(p2)

// let p2=new Promise((resolve,reject)=>{
//     //throw new Error()
//     resolve(1)
// }).then((res)=>{
//     console.log('p2-then1')
//     //console.log(res)
//     let p=new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve(res)
//         },1000)
//     })
//     return p
// }).then((res)=>{
//     console.log('p2-then2')
//     //console.log(res)
// })




