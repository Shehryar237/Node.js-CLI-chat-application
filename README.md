CLI Chat App (Node.js TCP)

Simple command-line chat app using Node.js TCP sockets. Multiple clients can connect and send messages to each other through a server.

How to Run
Start the server
node server.js
Start client(s) (open multiple terminals)
node client.js

Server runs on 127.0.0.1:3008.

Notes
Each client gets an ID automatically
Messages are broadcast to all users
Not secure (plain text, no authentication)
