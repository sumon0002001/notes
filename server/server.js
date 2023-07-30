require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./connectDB.js');
const Notes = require('./model/Notes.js');

const app = express();
const PORT = process.env.PORT || 4000

connectDB()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/api/v1/notes", async (req, res) => {
  try {
    const data = await Notes.find({})
    if(!data) {
      return res.status(500).json({error: 'No data available'})
    }
    res.status(200).json(data)
    } catch (error) {
    res.status(500).json({error: 'error occured while fetching data '})
  }
});


app.get("/api/v1/notes/:id", async (req, res) => {
  try {
    const notesId = req.params.id
    const data = await Notes.findById(notesId)
    if(!data) {
      return res.status(500).json({error: 'No data available'})
    }
    res.status(200).json(data)
    } catch (error) {
    res.status(500).json({error: 'error occured while fetching data '})
  }
});

app.post("/api/v1/notes", async (req, res) => {
  try {
    const {title, description} = req.body;
    const data = await Notes.create({title, description})
    if(!data) {
      return res.status(500).json({error: 'No data available'})
    }
    res.status(200).json(data)
    } catch (error) {
    res.status(500).json({error: 'error occured while creating data '})
  }
});

app.put("/api/v1/notes/:id", async (req, res) => {
  try {
    const notesId = req.params.id
    const {title, description} = req.body;
    const data = await Notes.findByIdAndUpdate(notesId,{title, description})
    if(!data) {
      return res.status(500).json({error: 'No data available'})
    }
    res.status(200).json(data)
    } catch (error) {
    res.status(500).json({error: 'error occured while updating data '})
  }
});

app.delete("/api/v1/notes/:id", async (req, res) => {
  try {
    const notesId = req.params.id
    const data = await Notes.findByIdAndDelete(notesId)
    if(!data) {
      return res.status(500).json({error: 'No data available'})
    }
    res.status(200).json(data)
    } catch (error) {
    res.status(500).json({error: 'error occured while updating data '})
  }
});




app.get("/", (req, res) => {
    res.json("Hello mate!");
  });

  app.get("*", (req, res) => {
    res.sendStatus("404");
  });

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });