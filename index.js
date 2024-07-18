import express, { json } from "express";
import fs from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const readData = () => {
  try {
    const data = fs.readFileSync("./db_test.json");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync("./db_test.json", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

app.get("/", (req, res) => {
  res.send("welcome api crud")
});

app.get("/songs", (req, res) => {
  const data = readData();
  res.json(data.songs);
});

app.get("/songs/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const song = data.songs.find(x => x.id == id);
  res.json(song);
});

app.post("/songs", (req, res) => {
  const data = readData();
  const body = (req.body);
  const newSong = {
    id: data.songs.length + 1,
    ...body
  };
  data.songs.push(newSong);
  writeData(data);
  res.json(newSong);
});

app.put("/songs/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const songIndex = data.songs.findIndex(x => x.id === id);
  const body = (req.body);
  data.songs[songIndex] = {
    ...data.songs[songIndex],
    ...body
  }
  writeData(data);
  res.json({message: "Song updated successfully"});
});

app.delete("/songs/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const songIndex = data.songs.findIndex(x => x.id === id);
  data.songs.splice(songIndex, 1);
  writeData(data);
  res.json({message: "Song deleted successfully"});
});


app.listen(3000, () => {
  console.log('server listening on port 3000');
});