import { useForm } from "react-cool-form";

import { CircularProgress, Alert } from "@mui/material";

import { requestToken } from "../../utils/token";
import Field from "../form/Field";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const { form, use } = useForm({
    defaultValues: { name: "", pass: "" },

    onSubmit: (values) => {
      requestToken(values.name, values.pass, setError).then((response) => {
        if (response === 200) {
          window.location.href = "/tasks";
        } else {
          setShowLoading(false);
        }
      });
    },
  });

  const errors = use("errors", { errorWithTouched: true });

  return (
    <>
      {error && (
        <div className={"alert" + (showLoading ? " hide" : "")}>
          <Alert severity="error">Error — {error}</Alert>
        </div>
      )}

      <form
        autoComplete="off"
        ref={form}
        className={`loginform` + (showLoading ? " hide" : "")}
      >
        <div className="form-row">
          <Field
            label="Username"
            id="name"
            name="name"
            required
            minLength={4}
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
          <input
            type="submit"
            onClick={() => {
              setShowLoading(true);
            }}
            value="Login"
          />
        </div>
      </form>
      <div className="form-row circularProgress">
        {showLoading && <CircularProgress />}
      </div>
    </>
  );
};

export default LoginForm;
