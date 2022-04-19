var express = require('express')
var Router = express.Router()
const fs = require('fs');
var properties = {}
var cities = []
var types = []
var minVal = Infinity
var maxVal = 0

fs.readFile('public/data.json', (err, data) => {
    if (err) {
        throw err
    }
    properties = JSON.parse(data);
    for (let prop of properties) {
        let city = prop['Ciudad']
        if (!cities.includes(city)) {
            cities.push(city)
        }
        let ty = prop['Tipo']
        if (!types.includes(ty)) {
            types.push(ty)
        }
        let precio = parseInt(prop['Precio'].replace("$", "").replace(",", ""))
        
        if (precio < minVal) {
            minVal = precio
        }
        if (precio > maxVal) {
            maxVal = precio
        }
    }
});

Router.get('/prices/', function (req, res) {
    res.send({ "min": minVal, "max": maxVal })
})

Router.get('/cities/', function (req, res) {
    res.send(cities)
})

Router.get('/types/', function (req, res) {
    res.send(types)
})

Router.get('/', function (req, res) {
    res.send(properties)
})

Router.post('/', function (req, res) {
    var message = req.body
    let city = message.Ciudad
    if (!cities.includes(city)) {
        city = null
    }
    let ty = message.Tipo
    if (!types.includes(ty)) {
        ty = null
    }
    var minPrice = parseInt(message.PrecioMin)
    if (minPrice < minVal || isNaN(minPrice)) {
        minPrice = minVal
    }
    var maxPrice = parseInt(message.PrecioMax)
    if (maxPrice > maxVal || isNaN(maxPrice)) {
        maxPrice = maxVal
    }
    let minnorSearch = []

    let cityBool = false
    if (city === null) {
        cityBool = true
    }
    let typeBool = false
    if (ty === null) {
        typeBool = true
    }

    for (let prop of properties) {
        let cB2 = false
        if (!cityBool){
            if (prop['Ciudad'] == city) {
                cB2 = true
            }
        }else{
            cB2 = true
        }
        let tB2 = false
        if (!typeBool){
            if (prop['Tipo'] == ty) {
                tB2 = true
            }
        }else{
            tB2 = true
        }

        let precio = parseInt(prop['Precio'].replace("$", "").replace(",", ""))
        let pB = false
        if (precio>= minPrice && precio<= maxPrice){
            pB = true
        }

        if (cB2 && tB2 && pB) {
            minnorSearch.push(prop)
        }
    }
    res.json(minnorSearch)
})

module.exports = Router