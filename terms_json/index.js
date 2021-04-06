const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const methodOverride = require("method-override");
const data = require("./data/Hardware_Cables.json");
const data1 = require("./data/Network_Services.json");

//middleware
app.use(express.urlencoded({ extended: true })); //NEED for parsing request body. but only set up to work with form data.
app.use(express.json());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(express.static("public"));
app.set("public", path.join(__dirname, "/public"));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//combine and clean data
function combineData(dataArray1, dataArray2) {
  Array.prototype.push.apply(dataArray1, dataArray2);
  cleanData(dataArray1);
  return dataArray1;
}
function cleanData(dataObject) {
  for (let i = 0; i < dataObject.length; i++) {
    dataObject[i].Term_ID = i;
  }
  for (let i = 0; i < dataObject.length; i++) {
    if (!dataObject[i].Terms) {
      dataObject[i].Terms = dataObject[i].Term_Name;
      delete dataObject[i].Term_Name;
    }
  }
  for (let i = 0; i < dataObject.length; i++) {
    if (!dataObject[i].Definitions) {
      dataObject[i].Definitions = dataObject[i].Term_Definition;
      delete dataObject[i].Term_Definition;
    }
  }
  for (let i = 0; i < dataObject.length; i++) {
    delete dataObject[i].Concept_ID;
  }
  for (let i = 0; i < dataObject.length; i++) {
    delete dataObject[i].Protocol_ID;
  }
}

combineData(data, data1);

app.get("/", (req, res) => {
  res.json(data);
});

app.listen(5000, () => {
  console.log("listening on port 5000....");
});
