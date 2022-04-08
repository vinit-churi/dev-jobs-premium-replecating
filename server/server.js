require("dotenv").config();
const axios = require("axios").default;
const { json } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// middleware

let jobs = {};

app.use(express.json());

app.get("/jobs", (req, res) => {
  res.json(jobs);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});

async function updateJobs() {
  const config = {
    method: "get",
    url: `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`,
    headers: {
      NEWS_KEY: "",
    },
  };

  axios(config)
    .then(function (response) {
      jobs = response.data;
      console.log(jobs);
    })
    .catch(function (error) {
      console.log(error);
    });
}

let intervalId = global.setInterval(function () {
  updateJobs();
}, 1000 * 60 * 60 * 24);

updateJobs();
