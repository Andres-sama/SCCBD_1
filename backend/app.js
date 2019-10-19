'use strict';

const express = require ('express');
const logger = require ('morgan');
const cors = require('cors');
//const cipher = require('ci')
const crypto = require('crypto');
const app = express();

app.use(logger('dev')); // Log requests (GET..)
app.use(express.json()); // Needed to retrieve JSON

//conexion al puerto
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
	console.log('Connected to Port: ', PORT )
});

//implementacion del cors
app.unsubscribe((req, res, next) =>{
	res.header("Access-Control-Allow-Headers" ,"http://localhost:4200"); 
	res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
	if(req.method == 'OPTIONS'){
		res.header("Access-Control-Allow-Headers", "POST", "GET" )
	} next()
})
app.use(cors());




//FUNCIONES POST, GET, ENCRIPTAR, DESENCRIPTAR

const KEY_LENGTH = 32; 
const IV_LENGTH = 16; // For AES, this is always 16
let iv = crypto.randomBytes(IV_LENGTH);
let key = crypto.randomBytes(KEY_LENGTH);

app.post( '/post/:mns',	(req, res) => {
	let mns = req.params.mns;
	console.log('este mensaje recibo del frontend: '+ mns);
	let enmns = encrypt(mns);
	res.json (enmns);
}) 

app.get('/get/:mns', (req,res) => {
	let emns = req.params.mns;
	console.log('este mensaje recibo del server: '+ emns);
	let demns = decrypt(emns);
	console.log('este mensaje recibo del server y lo desencripto: '+ demns);
	res.json (demns);
})

//funcion de encriptar
function encrypt (msg){
	console.log('encrypt del server 1');
	let cipher = crypto.createCipher('aes-256-cbc', key,iv);
	let encrypted = cipher.update(msg);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return {encryptedData: encrypted.toString('hex')};
	}

//funcion de encriptar
function decrypt (msg){
	console.log('decrypt del server 1');
	let cipher = crypto.createDecipher('aes-256-cbc',key,iv);
	let decrypted = cipher.update(msg);
	decrypted = Buffer.concat([decrypted, cipher.final()]);
	return {decipher: decipher.toString('hex')};
}




