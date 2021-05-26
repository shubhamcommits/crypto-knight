const socket = io('ws://localhost:3000', {
    secure: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 2000,
    randomizationFactor: 0.5,
    autoConnect: true,
    transports: ['websocket'],
    upgrade: true
  })

// socket.on('connect')

socket.emit('global')

socket.on('globalUpdate', data => {

    // console.log(data)

})
console.log('getting')
socket.emit('joinUser', '609d2e63e176b7b6b0791e73')

socket.emit('triggers', '609d2e63e176b7b6b0791e73')

socket.on('triggersUpdate', data => {
    console.log(data)
})

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('global', text)
    
}
