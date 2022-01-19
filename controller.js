//bring in temp data
const data = require("./data");

class Controller {
    // getting all_todos
    async listTodos() {
        return new Promise((resolve,_) => resolve(data));
    }

    async getTodo(id) {
        return new Promise((resolve,reject) => {
            let todo = data.find((todo) => todo.id === parseInt(id));
            if(todo) {
                resolve(todo);
            } else{
                reject(`Todo with id ${id} not found`);
            }
        });
    }
};

module.exports = Controller;