const express = require('express')
const { success, getUniqueId } = require('./helper.js')
const morgan = require('morgan')
const favicon = require('serve-favicon')
let pokemons = require('./mock-pokemon')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello again, Express !'))

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a bien été trouvé'
    res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req, res) => {
    const num = pokemons.length
    const message = 'Voici la liste de pokémons'
    res.json(success(message, pokemons))
})
  
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
})

app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}`))