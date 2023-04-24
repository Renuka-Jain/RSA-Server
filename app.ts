import express from 'express'
import cors from 'cors'
import * as rsa from './rsa'
import * as bigintConversion from 'bigint-conversion'


const port = 3000


const app= express()
app.use(cors({
    origin: 'http://localhost:3001' //url del angular del cliente
}))

app.get('/',(req,res)=>{
    res.send('hello arnauuu')

})




app.get('/rsa',async(req,res)=>{
    const rsaKeys = await rsa.generateKeys(2048)   
    console.log(rsaKeys)   
    //res.json({publicKey: rsaKeys.publicKey})
    res.json({publickey: {
        e: bigintConversion.bigintToHex(rsaKeys.publicKey.e),
        n: bigintConversion.bigintToHex(rsaKeys.publicKey.n)

    }})
})

app.get('/user',(req,res)=>{
    const user = {
        username:'arnauuuu',
        description: 'es inteligenteeee'

    }
    res.json(user)
})

app.listen(port, function() {
    console.log(`listenning on http://locahost:${port}`)
})