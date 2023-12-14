const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const folderPath = path.join(__dirname, "files");

app.use(bodyParser.json());

app.post("/createFile", (req, res) => {
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\..+/, "");
  const fileName = `${timestamp}.txt`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating file");
    } else {
      res.status(200).send("File created successfully");
    }
  });
});

app.get("/getAllFiles", (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading files");
    } else {
      res.status(200).json({ files });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
