'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MonedaSchema = Schema({
    valor: Number,
    id: String,

})



module.exports = mongoose.model('Moneda',MonedaSchema)