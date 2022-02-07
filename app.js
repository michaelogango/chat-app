
const Server = require('net').createServer()

const port = process.env.PORT || 3000
const localhost = `127.0.0.1`

let counter = 0;
let sockets = {}

Server.on('connection', (socket) => {
    socket.id = counter++
    console.log('Socket connection established!')
    socket.write(`Type your username please...\n`)

    socket.on('data', (data) => {
        if(!sockets[socket.id]){
            socket.name = data.toString().trim()
            socket.write(`Welcome to the chat ${socket.name}\n`)

            sockets[socket.id] = socket
            return
        }
      
        Object.entries(sockets).forEach(([key, cs]) => {
            if(socket.id == key) return
            cs.write(`${socket.name}: `)
            cs.write(data) 
        })
    })

    socket.on('end', () => {
        delete sockets[socket.id]
        console.log('Connection terminated')
    })
})

Server.listen(port, localhost, () => {
    console.log(`Listening https://${localhost}:${port}/`)
})

