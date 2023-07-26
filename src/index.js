const app = require('./app')
const http = require('http')

const server = new http.createServer(app)

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

//server listening
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})