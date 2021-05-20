const redisAdapter = require('socket.io-redis')
const CoinService = require('../api/services/coin.service')
const { User, Trigger } = require('../api/models')

// Maintains the count of all the connected users
const globalConnections = []

// Coins array
let coins = []

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
                socket.on('global', async () => {

                    // // Fetch the data
                    // let coins = await CoinService.realTimeCoinPrices()

                    // // Emit the message from the socket
                    io.emit('globalUpdate', coins)

                    // Call the update
                    setInterval(async () => {

                        // Fetch the data
                        coins = await CoinService.realTimeCoinPrices()

                        // Emit the message from the socket
                        io.emit('globalUpdate', coins)
                    }, 30000)
                })

                // Join user on private user room
                socket.on('joinUser', (userId) => {

                    // Join the room
                    socket.join(`room_${userId}`, () => {

                        // Console the confirmation
                        console.log('User has joined a new room: ', `room_${userId}`)
                    })
                })
                // Create the trigger
                socket.on('triggers', async (userId) => {
                    
                    setInterval(async () => {

                        // Find the user
                        let user = await User.findById(userId)
                            .populate('triggers', '_id name coin price condition notified')

                        // Create triggers array
                        let triggers = []

                        // Check if triggers contain elements
                        if (user.triggers.length > 0) {

                            // Implement triggers array
                            triggers = user.triggers

                            // Loop out through each trigger
                            for (let index = 0; index < triggers.length && coins.length > 0; index++) {

                                // Get current coin details
                                let coinDetails = coins.find((coin) => coin.id === triggers[index]['coin'])
                                let originalCoinPrice = coinDetails['current_price']

                                // Fetch the condition and set price
                                let condition = triggers[index]['condition']
                                let setPrice = triggers[index]['price']

                                if (triggers[index]['notified'] == false) {

                                    // Check for the conditions
                                    if (condition == 'less') {
                                        if (setPrice > originalCoinPrice) {
                                            io.sockets.in(`room_${userId}`).emit('triggersUpdate', {
                                                message: `Your condition ${triggers[index]['name']} for ${triggers[index]['coin']} less than ${triggers[index]['price']} has been met.`
                                            })
                                        }
                                    } else if (condition == 'greater') {
                                        if (setPrice < originalCoinPrice) {
                                            io.sockets.in(`room_${userId}`).emit('triggersUpdate', {
                                                message: `Your condition ${triggers[index]['name']} for ${triggers[index]['coin']} more than ${triggers[index]['price']} has been met.`
                                            })
                                        }
                                    } else if (condition == 'equal') {
                                        if (setPrice == originalCoinPrice) {
                                            io.sockets.in(`room_${userId}`).emit('triggersUpdate', {
                                                message: `Your condition ${triggers[index]['name']} for ${triggers[index]['coin']} equal to ${triggers[index]['price']} has been met.`
                                            })
                                        }
                                    }

                                    // Update the trigger status
                                    await Trigger.findByIdAndUpdate(
                                        { _id: triggers[index]['_id'] },
                                        { $set: { notified: true } },
                                        { new: true })
                                }

                            }

                        }

                    }, 10000)
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
