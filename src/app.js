const express = require("express");
const cors = require("cors");
const csv = require("csvtojson");
const axios = require("axios");

const IMAGE_REPO = process.env.IMAGE_REPO;
const IMAGE_TYPE = process.env.IMAGE_TYPE;

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ health: "up" });
});

app.get("/shop", async (req, res) => {
  const shopCsvData = await axios
    .get(process.env.DATA_CSV)
    .then((res) => res.data);

  const booksArray = await csv().fromString(shopCsvData);

  const booksArrayWithImage = booksArray.map((book) => {
    book.imageUrl = `${IMAGE_REPO}${book.id}.${IMAGE_TYPE}`;

    return book;
  });

  res.json(booksArrayWithImage);
});

module.exports = app;
