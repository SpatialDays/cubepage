export const fetchTasks = async (setTasks, setSettings) => {
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json; charset=utf-8;",
  };
  await axios({
    method: "post",
    url: process.env.REACT_APP_PORTAL_URL + "/fetch-products",
    headers: headers,
    data: { token: window.localStorage.getItem("cubetoken") },
  })
    .then(function (response) {
      setSettings(response.data.settings);
      setTasks(response.data.result);
    })
    .catch(function (error) {
      if ((error.response && error.response.status > 400) || !error.response) {
        window.location.href = "/login";
      }
    });
};

export const fetchActiveTasks = async (
  setActiveTasks,
  setLoadingActiveTasks
) => {
  setLoadingActiveTasks(true);
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json; charset=utf-8;",
    Authorization: "Bearer " + window.localStorage.getItem("cubetoken"),
  };
  await axios({
    method: "get",
    url: process.env.REACT_APP_PORTAL_URL + "/task/",
    headers: headers,
  })
    .then(function (response) {
      setActiveTasks(response.data);
      setLoadingActiveTasks(false);
    })
    .catch(function (error) {
      if ((error.response && error.response.status > 400) || !error.response) {
        //window.location.href = "/login";
      }
      setLoadingActiveTasks(false);
    });
};

export const fetchTaskNames = async (setTaskNames) => {
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json; charset=utf-8;",
  };
  await axios({
    method: "post",
    url: process.env.REACT_APP_PORTAL_URL + "/fetch-products",
    headers: headers,
    data: { token: window.localStorage.getItem("cubetoken") },
  })
    .then(function (response) {
      // Create a dictionary of name to display_name
      const taskNames = {};
      response.data.result.forEach((task) => {
        taskNames[task.name] = task.display_name.trim();
      });
      setTaskNames(taskNames);
    })
    .catch(function (error) {
      console.log(error);
      if ((error.response && error.response.status > 400) || !error.response) {
        //window.location.href = "/login";
      }
    });
};

export const checkTask = async (taskid, setActiveTasks) => {
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json; charset=utf-8;",
    Authorization: "Bearer " + window.localStorage.getItem("cubetoken"),
  };
  await axios({
    method: "get",
    url: process.env.REACT_APP_PORTAL_URL + "/task/" + taskid,
    headers: headers,
  })
    .then(function (response) {
      console.log(response);
      setActiveTasks(response.data);
    })
    .catch(function (error) {
      if ((error.response && error.response.status > 400) || !error.response) {
        //window.location.href = "/login";
      }
    });
};

export const fetchResults = async (setResults) => {
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json; charset=utf-8;",
    Authorization: "Bearer " + window.localStorage.getItem("cubetoken"),
  };
  await axios({
    method: "get",
    url: process.env.REACT_APP_PORTAL_URL + "/result/",
    headers: headers,
  })
    .then(function (response) {
      setResults(response.data);
    })
    .catch(function (error) {
      if ((error.response && error.response.status > 400) || !error.response) {
        //window.location.href = "/login";
      }
      console.log("Failed to fetch results ::", error);
    });
};

export const downloadResult = async (taskId) => {
  // Downloads the result ZIP from the server
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json; charset=utf-8;",
    Authorization: "Bearer " + window.localStorage.getItem("cubetoken"),
  };
  await axios({
    method: "get",
    url: process.env.REACT_APP_PORTAL_URL + "/result/" + taskId,
    headers: headers,
    responseType: "blob",
  })
    .then(function (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "result.zip");
      document.body.appendChild(link);
      link.click();
    })
    .catch(function (error) {
      if ((error.response && error.response.status > 400) || !error.response) {
        console.log('Failed to download result ::', error);
        alert("Failed to download result");
      }
    });
};

export const submitTasks = async (task, data, setLoading, setErrorMessage) => {
  const axios = require("axios");
  var url =
    process.env.REACT_APP_PORTAL_URL +
    "/submit-task?APP_KEY=" +
    window.localStorage.getItem("cubetoken");
  await axios
    .post(url, {
      task: task,
      args: data,
      token: window.localStorage.getItem("cubetoken"),
    })
    .then(() => {
      window.location.href = "/submission";
      setLoading(false);
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.status > 400 &&
        error.response.status < 450
      ) {
        window.location.href = "/login";
      }

      var errorMsg;
      if (error.response && error.response.data) {
        errorMsg = error.response.data.map((e) => {
          return e.Error;
        });
      }

      setLoading(false);
      if (typeof errorMsg === "string") {
        setErrorMessage(errorMsg);
        return;
      }
      setErrorMessage(errorMsg.join(", \n"));
    });
};

export const convertDateToString = (date) => {
  return date.getFullYear();
};

export const findElementInListOfObjects = (array, title, param) => {
  return array.find((element) => {
    return element[param] === title;
  });
};
