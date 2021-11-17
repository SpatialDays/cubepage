import { useForm } from "react-cool-form";

import { CircularProgress, Alert } from "@mui/material";

import { requestToken } from "../../utils/token";
import Field from "../form/Field";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState(null);

  const { form, use } = useForm({
    defaultValues: { name: "jamesy", pass: "jampass" },

    onSubmit: (values) => {
      requestToken(values.name, values.pass, setError).then((response) => {
        if (response === 200) {
          window.location.href = "/tasks";
        } else {
        }
      });
    },
  });

  const errors = use("errors", { errorWithTouched: true });

  return (
    <>
      {error && (
        <div className="alert">
          <Alert severity="error">Error — {error}</Alert>
        </div>
      )}
      <form autoComplete="off" ref={form} className="loginform">
        <div className="form-row">
          <Field
            label="Username"
            id="name"
            name="name"
            required
            minLength={6}
            error={errors.username}
          />
        </div>
        <div className="form-row">
          <Field
            label="Password"
            id="pass"
            name="pass"
            type="password"
            required
            minLength={6}
            error={errors.password}
          />
        </div>
        <div className="form-row">
          <input type="submit" value="Login" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
