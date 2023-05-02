import express from 'express'
import cors from 'cors'
import * as rsa from './rsa'
import * as bigintConversion from 'bigint-conversion'
import { Request, Response } from 'express';
import { Router } from 'express';
import bodyParser from "body-parser";

const router = Router();

const port = 3001

const app= express()
app.use(cors({
    origin: 'http://localhost:3000' //url del cliente
}))

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('hello arnauuu')
})

app.post('/signed', async(req: Request, res: Response)=>{
    const text = req.body;
    console.log(text)
    //text esta signat, falta verificar
})

app.post('/encrypted', async(req: Request, res: Response)=>{
    console.log(req.body.text)
    //text esta encryptat, falta despencriptar
})

app.get('/rsapubkeyserver',async(req,res)=>{ //desde el cliente se puede pedir public key
    const rsaKeys = await rsa.generateKeys(2048)   
    console.log(rsaKeys)   
    //res.json({publicKey: rsaKeys.publicKey})
    res.json({publickey: {
        e: bigintConversion.bigintToHex(rsaKeys.publicKey.e),
        n: bigintConversion.bigintToHex(rsaKeys.publicKey.n)
    }})
})





app.listen(port, function() {
    console.log(`listenning on http://locahost:${port}`)
})