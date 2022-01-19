const http = require('http');

const {getReqData} = require("./utils");
const Todo = require("./controller");

const PORT = 5000;

const server = http.createServer(async (req,res) => {
    switch(true) {
        case (req.url === '/api' && req.method === "GET"):
            //response header
            res.writeHead(200, {"Content-Type": "application/json"});

            //set response

            res.write("Hello, I am nodejs");

            res.end();
            break;
        case (req.url === '/api/todos' && req.method ==="GET"):
            // response header
            const todos = await new Todo().listTodos();
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(todos));
            break;
        case(req.url.match(/\api\/todos\/([0-9]+)/) && req.method === "GET"):
            try {
            const id = req.url.split("/")[3];
            const todo = await new Todo().getTodo(id);
            res.writeHead(200, {"Content-type": "application/json"});

            res.end(JSON.stringify(todo));
            } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message:error}));
            }
        case(req.url === '/api/todos' && req.method === "POST"):
            let todoData = await getReqData(req);
            let createdTodo = await new Todo().createTodo(JSON.parse(todoData));
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(createdTodo));

            break;
    }

});

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`); //use backticks ` that takes everything
})