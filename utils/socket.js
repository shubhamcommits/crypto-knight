const redisAdapter = require('socket.io-redis')
const { CoinService } = require('../api/services')
const axios = require('axios')

// Maintains the count of all the connected users
const globalConnections = []

const socket = {

    async init(server) {

        try {
            // Enable the socket server
            const io = require('socket.io')(server, {
                cors: { origin: "*" }
            })

            // Add the redis adapter
            io.adapter(redisAdapter({ host: 'localhost', port: 6379 }))

            io.on('connection', async (socket) => {

                // Push the socket into the array
                globalConnections.push(socket)

                // Console the user
                console.log('A new user has been connected!')
                console.log('Total number of users connected to the app: ', globalConnections.length)

                // Turn on the sockets
                socket.on('global', async (message) => {

                    // Console the message
                    console.log(message)

                    // Fetch the data
                    let coins = await axios.get(process.env.REALTIME_COIN_PRICES)

                    // Emit the message from the socket
                    io.emit('globalUpdate', coins.data)

                    // Call the update
                    setInterval(async () => {

                        // Fetch the data
                        let coins = await axios.get(process.env.REALTIME_COIN_PRICES)

                        // Emit the message from the socket
                        io.emit('globalUpdate', coins.data)
                    }, 3000)
                })

                // Join user on private user room
                socket.on('joinUser', (userId) => {
                    socket.join(userId)
                })

                // On Disconnecting the socket
                socket.on('disconnect', () => {

                    // Remove the socket from globalConnection array
                    globalConnections.splice(globalConnections.indexOf(socket), 1)

                    // Console the confirmation
                    console.log('Total number of users connected to the app: ', globalConnections.length)
                })
            })

        } catch (error) {
            console.log("Socket server error", error)
        }

    }

}

module.exports = socket
