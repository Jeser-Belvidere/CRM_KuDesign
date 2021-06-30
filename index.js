require('dotenv').config()
const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const userRouter = require('./routes/user.routes')
const projectRouter = require('./routes/project.routes')

const port = process.env.PORT || 6000
const swaggerDocument = require('./swagger.json')

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', userRouter)
app.use('/project', projectRouter)


async function start() {
    try {

        app.listen(port, ()=> console.log(`App has been started on ${port}...`))
    } catch (error) {
        console.log('Server initial function error',error.message)
        process.exit(1)
    }
}

start()