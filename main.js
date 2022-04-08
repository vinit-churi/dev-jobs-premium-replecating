window.addEventListener("DOMContentLoaded", () => {
  console.log("dom content is loaded");
});

// const taskElement = document.importNode(taskTemplate.content, true);

var requestOptions = {
  method: "GET",
  redirect: "follow",
};

const renderView = (jobs) => {
  jobs.forEach((job) => {
    console.log(job.location.display_name);
    console.log(job.company.display_name);
    console.log(job.category.label);
    console.log(job.contract_time);
    console.log(job.created);
    console.log(job.description);
  });
};

const getJobs = async () => {
  const data = await fetch("http://localhost:3000/jobs", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  console.log(data.results);

  renderView(data.results);
};

getJobs();
