const socket = io('ws://3.143.144.160', {
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
socket.emit('joinUser', '6113fb9c43dbdae4ba9f4088')

socket.emit('triggers', '6113fb9c43dbdae4ba9f4088')

socket.on('triggersUpdate', data => {
    console.log(data)
})

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('global', text)
    
}
