const socket = io('ws://13.58.58.48', {
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

    console.log(data)
    // const el = document.createElement('li');
    // el.innerHTML = text;
    // document.querySelector('ul').appendChild(el)

});

document.querySelector('button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('global', text)
    
}
