export const requestToken = async (name, pass, setError) => {
  const axios = require("axios");
  let values = { user: name, pass };
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios
    .post(process.env.REACT_APP_TOKEN_URL + "/request-token", values, {
      headers: headers,
    })
    .then(function (response) {
      window.localStorage.setItem("cubetoken", response.data.token);
      return 200;
    })
    .catch(function () {
      setError("Incorrect username/password");
      return 403;
    });
};

export const refreshToken = async () => {
  const axios = require("axios");
  let values = { token: window.localStorage.getItem("cubetoken") };
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios
    .post(process.env.REACT_APP_TOKEN_URL + "/refresh-token", values, {
      headers: headers,
    })
    .then(function (response) {
      window.localStorage.setItem("cubetoken", response.data.token);
    })
    .catch(function (error) {
      console.log(error);
    });
};
