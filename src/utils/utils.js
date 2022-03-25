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
      console.log(response);
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
}

export const fetchResults = async (setResults, setLoadingResults) => {
  setLoadingResults(true);
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
      setLoadingResults(false);
    })
    .catch(function (error) {
      if ((error.response && error.response.status > 400) || !error.response) {
        //window.location.href = "/login";
      }
      console.log("Failed to fetch results ::", error);
      setLoadingResults(false);
    });
};

const base64ToBlob = (base64, mimetype, slicesize) => {
  if (!window.atob || !window.Uint8Array) {
      // The current browser doesn't have the atob function. Cannot continue
      return null;
  }
  mimetype = mimetype || '';
  slicesize = slicesize || 512;
  var bytechars = atob(base64);
  var bytearrays = [];
  for (var offset = 0; offset < bytechars.length; offset += slicesize) {
      var slice = bytechars.slice(offset, offset + slicesize);
      var bytenums = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          bytenums[i] = slice.charCodeAt(i);
      }
      var bytearray = new Uint8Array(bytenums);
      bytearrays[bytearrays.length] = bytearray;
  }
  return new Blob(bytearrays, {type: mimetype});
};

export const downloadResult = async (taskId) => {
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json; charset=utf-8;",
    Authorization: "Bearer " + window.localStorage.getItem("cubetoken"),
  };
  await axios({
    method: "get",
    url: process.env.REACT_APP_PORTAL_URL + "/result/" + taskId,
    headers: headers,
    responseType: "arraybuffer",
  })
    .then(function (response) {
      // download zip file
      var blob = base64ToBlob(
        btoa(
          String.fromCharCode.apply(
            null,
            new Uint8Array(response.data)
          )
        ),
        "application/zip"
      );
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "result.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);


    })
    .catch(function (error) {
      if ((error.response && error.response.status > 400) || !error.response) {
        //window.location.href = "/login";
      }

      console.log(error);
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
      //window.location.href = "/submission";
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
