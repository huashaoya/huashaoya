function* myGenerator(){
    try{
        yield 1
        console.log(2222222)
        yield 2
    }catch(e){
        console.log(e)
    }
    
    console.log(666)
    const res:number=yield 3
    console.log('res:',res)
    return 0
}


let g=myGenerator()
console.log(g)
console.log(g.next())
g.throw(new Error('error'))
console.log(g.next())
console.log(g.next())
console.log(g.next(888))
console.log(g.next())
console.log(g.next())


