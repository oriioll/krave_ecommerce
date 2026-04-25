//import express i llibreries
import express from "express";
import fs from "fs"; //treballar amb arxius - read-write
import bodyParser from "body-parser";

//crear objecte server
const app = express();
const PORT = 3000;

//posa server a escoltar a un port
app.listen(PORT, () => {
  console.log("Server listing on port " + PORT);
});

//crear primer endpoint
app.get("/", (req, res) => {
  res.send("hello world");
});