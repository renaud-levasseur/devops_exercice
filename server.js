/************************************/
/*** Import des modules nécessaires */
const express = require('express')
const cors = require('cors')
const path = require('path')

const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocs = yaml.load('./swadoc.yaml')

/************************************/
/*** Import de la connexion à la DB */
let DB = require('./db.config')

/*****************************/
/*** Initialisation de l'API */
const app = express()

app.use(cors({
   origin: "*",
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/***********************************/
/*** Import des modules de routage */
const user_router = require('./routes/users')
const cocktail_router = require('./routes/cocktails')

const auth_router = require('./routes/auth')

/******************************/
/*** Mise en place du routage */

app.get('/', (req, res) => {
    const event = new Date()
    console.log('HOME Time:', event.toString())    
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/users', user_router)
app.use('/cocktails', cocktail_router)

app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send('What the hell are you doing !?!'))


/********************************/
/*** Start serveur avec test DB */
DB.sequelize.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
        })
    })
    .catch(err => console.log('Database Error', err))




