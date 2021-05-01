const app = require('./api/app')
const http = require('http')
const cluster = require('cluster')
const { Socket }= require('./utils')

if (cluster.isMaster) {

    // Fetch Number of Workers
    const numWorkers = require('os').cpus().length

    console.log('Master cluster setting up ' + numWorkers + ' workers...')

    const server = require('http').createServer()
    const io = require('socket.io')(server)
    const redis = require('socket.io-redis')
  
    io.adapter(redis({ host: 'localhost', port: 6379 }))
  
    setInterval(function() {
      // all workers will receive this in Redis, and emit
      io.emit('data', 'payload')
    }, 1000)

    // Fork the process and make clusters
    for (let i = 0 ; i < numWorkers; i++) {
        cluster.fork()
    }

    // Cluster Method for Online
    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online')
    })

    // Cluster Method for Exit
    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
        console.log('Starting a new worker')
        cluster.fork()
    })
} else {

    // Define Application port
    const port = process.env.PORT || 3000

    // Defining the Host Name
    const host = process.env.HOST || '0.0.0.0'

    // Environment State Variable
    const env = process.env.NODE_ENV

    // Creating Microservice Server
    const server = http.createServer(app)

    // Start the Socket Server
    const io = Socket.init(server)

    // Exposing the server to the desired port
    server.listen(port, host, () => {
        console.log(`
    
  ⚙️  Crypto Knight server running at: \n\t http://${host}:${port}
  
  🌏 Environment: \n\t ${env}

  💻 Process: \n\t ${process.pid} is listening to all incoming requests`)})

}