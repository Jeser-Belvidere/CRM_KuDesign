require('dotenv').config()
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const userRouter = require('./routes/user.routes')


const port = process.env.PORT || 6000
const swaggerDocument = require('./swagger.json')

const app = express()

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }));
app.use('/api', userRouter)



async function start() {
    try {

        app.listen(port, ()=> console.log(`App has been started on ${port}...`))
    } catch (error) {
        console.log('Server initial function error',error.message)
        process.exit(1)
    }
}

start()