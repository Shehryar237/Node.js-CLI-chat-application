const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

const clearLine=(dir)=>{
    return new Promise ((res,rej)=>{
        process.stdout.clearLine(dir,()=>{
            res();
        });
    })
}

const moveCursor = (dx,dy) =>{
    return new Promise ((res,rej)=>{
        process.stdout.moveCursor(dx,dy,()=>{
            res();
        });
    })
}

let id;

const socket = net.createConnection({host: "127.0.0.1", port:3008},async ()=>{
    console.log("connected to server");

    const ask = async () =>{
        const message = await rl.question("Enter a message > ");
        await moveCursor(0,-1);
        await clearLine(0);
        socket.write(`${id}-message-${message}`);//this will go the servers end of the socket
    }

    ask();

    socket.on("data",async (data)=>{
        //runs everytime socket is written to fom server

        console.log();// empty line
        await moveCursor(0,-1); //move one line up
        await clearLine(0); //clear line cursor moved into

        if(data.toString("utf-8").substring(0,2)==="id"){
            //when we get id
            id= data.toString("utf-8").substring(3);
            console.log(`Your id is ${id}\n`);
        }

        else{
            //when we get msg
            console.log(data.toString("utf-8"));
        }

        ask();
    })
});  //net.socket

socket.on("end",()=>{
    console.log("ended")
})
