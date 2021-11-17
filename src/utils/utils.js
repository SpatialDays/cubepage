export const fetchTasks = (setTasks, setSettings) => {
  const axios = require("axios");
  const headers = {
    "Content-Type": "application/json",
  };
  axios
    .get(
      process.env.REACT_APP_CUBEQUERY_URL +
        "/describe?APP_KEY=" +
        window.localStorage.getItem("cubetoken"),
      {
        headers: headers,
      }
    )
    .then(function (response) {
      setSettings(response.data.settings);
      setTasks(response.data.result);
    })
    .catch(function (error) {
      // Expired or Invalid Token
      console.log('FAILED', error.response);
      if ((error.response && error.response.status > 400) || !error.response) {
        window.location.href = "/login";
      }
    });
};

export const submitTasks = async (task, data, setLoading, setErrorMessage) => {
  const axios = require("axios");
  var url =
    process.env.REACT_APP_CUBEQUERY_URL +
    "/task?APP_KEY=" +
    window.localStorage.getItem("cubetoken");
  await axios
    .post(url, {
      task: task,
      args: data,
    })
    .then(() => {
      window.location.href = "/submission";
    })
    .catch((error) => {
      if (
        error.response &&
        error.response.status > 400 &&
        error.response.status < 450
      ) {
        window.location.href = "/login";
      }

      console.log(error.response)
      let errorMsg = error.response.data.map((e) => {
        return e.Error;
      });

      setLoading(false);
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
