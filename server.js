//Note: The app is ver unsecure, anyone can see the messages being 
//      sent if they sniff the network traffic, or anyone can send unauth requests
//      with modified requests


const net = require("net");
const server = net.createServer(); //server is event emitter object
const clients=[];

//if this event happens we call the passed function
server.on("connection",(socket)=>{
        //it will kick in whenever there is conenction
    console.log("new connection to server")

    const clientId=clients.length+1;
    socket.write(`id-${clientId}`);

    //announce user joining to all other clients
    clients.map((s)=>{
        s.socket.write(`User ${clientId} has joined the chat`);
    });

    socket.on("data",(data)=>{
        const dataString = data.toString("utf-8");
        const id = dataString.substring(0, dataString.indexOf("-"));
        const message = dataString.substring(dataString.indexOf("-message")+9);

        clients.map((s)=>{
            s.socket.write(`> User ${id}: ${message}`);
        })
    })

    //Broadcast user leaving to all other clients
    socket.on('end',()=>{
        clients.map((client)=>{
            client.socket.write(`User ${clientId} has left the chat`);
        });
    })

    clients.push({id:clientId.toString(), socket: socket});
})

server.listen(3008,"127.0.0.1",()=>{
    console.log("opened server: ", server.address());
})