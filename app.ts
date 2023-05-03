import express from 'express'
import cors from 'cors'
import * as rsa from './rsa'
import * as bigintConversion from 'bigint-conversion'
import { Request, Response } from 'express';
import { Router } from 'express';
import bodyParser from "body-parser";

const rsaKeysPromise = rsa.generateKeys(2048)   
const router = Router();
const port = 3001
const app = express()

// puerto cliente (URL)
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())

app.get('/',(req: Request, res: Response)=>{
    res.send('hello world')
})

app.post('/sign', async (req: Request, res: Response)=>{
    const text = req.body;
    console.log(text)
    //text esta signat, falta verificar
})

app.post('/decrypt', async (req: Request, res: Response)=>{
    console.log(req.body.text)
    //text esta encryptat, falta despencriptar
})

// cliente pide pubkey, server la manda
app.get('/rsapubkey', async (req: Request, res: Response)=>{
    const rsaKeys = await rsaKeysPromise
    console.log(rsaKeys)
    res.json({publickey: {
        e: bigintConversion.bigintToHex(rsaKeys.publicKey.e),
        n: bigintConversion.bigintToHex(rsaKeys.publicKey.n)
    }})
})

app.listen(port, function() {
    console.log(`listenning on http://locahost:${port}`)
})