require("dotenv").config();
const axios = require("axios").default;
const { json } = require("express");
const express = require("express");
const app = express();

// middleware

let jobs = {};

app.use(express.json());

app.get("/jobs", (req, res) => {
  res.json(jobs);
});

// app.use('/api/v1/jobs', jobsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on ${port}...`);
});

// "https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=13fa0c16&app_key=288b9049cf804e91045b9dfa5b280b21";

updateJobs();
var intervalId = global.setInterval(function () {
  updateJobs();
}, 1000 * 60 * 60 * 24);

var configGeo = {
  method: "get",
  url: `http://api.positionstack.com/v1/reverse?access_key=${process.env.ACCESS_KEY}&query=40.7638435,-73.9729691&limit=1`,
  headers: {},
};

// axios(configGeo)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

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
/* not need the location was present */
// async function updateJobsLocation() {
//   console.log(jobs);
// }
