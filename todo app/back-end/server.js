//express installation
const express = require("express");
const cors = require("cors");
//create an instance of the express
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
//cors policy
app.use(cors());

// // define a root
//this is not needed now since it is used for testing the sucess of tyhe port running
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

//sample storage place
// let todos = [];

// creating a mongoose database connecting
mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => {
    console.log("connected successfully to mongodb");
  })
  .catch(() => {
    console.log("error in connecting to mongo db");
  });
//creating a schema
const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
});
//creating a model
const todoModel = mongoose.model("Todo", todoSchema);

// creating a item
app.post("/todos", async (req, res) => {
  const { title, description } = req.body;
  //   const newTodo = {
  //     id: todos.length + 1,
  //     title,
  //     description,
  //   };
  //   todos.push(newTodo);
  //   console.log(todos);
  try {
    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//getting all the items from todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//updating a todo item in the list
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//deleting an todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//starting a server in the port
const port = 8000;
app.listen(port, () => {
  console.log("the server is started and listening to port" + port);
});
