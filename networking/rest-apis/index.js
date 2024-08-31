import express from "express";
import bodyParser from "body-parser";

const todos = [
  {
    id: "1",
    data: "Todo 1",
    completed: true,
  },
  {
    id: "2",
    data: "Todo 2",
    completed: false,
  },
];

const app = express();
app.use(bodyParser.json());

app.all("/", (req, res) => {
  res.send("i am up");
});

// CREATE 
app.post('/todos', (req, res) => {
    const todo = req.body;
    todos.push(todo);
    res.status(201).json({
        "status" : "Your to-do item has been added successfully"
    })
})

// READ
app.get("/todos", (req, res) => {
    res.status(200).json(todos)
})

// UPDATE
app.put('/todos/:id', (req, res) => {
    const todoBody = req.body;
    const todoId = req.params.id;
    console.log(todoId, typeof todoId);
    const todoIdindex = todos.findIndex(t => t.id === todoId);
    console.log(todoIdindex);
    if(todoIdindex !== -1){
        todos[todoIdindex] = {
            id : todoId,
            ...todoBody
        };
        res.status(202).json({
            "message" : `todo with id ${todoId} has been updated successfully`
        })
    }else{
        res.status(404).json({
            "message" : `todo with id ${todoId} not found`
        })
    }
})

// DELETE
app.delete("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    const index = todos.findIndex(t => t.id === todoId);
    console.log(index);
    if(index !== -1){
        todos.splice(index, 1);
        res.status(202).json({
            "message" : `todo with id ${todoId} has been deleted successfully`
        })
    }else{
        res.status(404).json({
            "message" : `todo with id ${todoId} not found`
        })
    }
})


const PORT = 5551;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
