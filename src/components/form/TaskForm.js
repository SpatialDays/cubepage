import { useForm } from "react-cool-form";
import Validate from "./Validate";

import StringField from "./types/StringField";
import WKTField from "./types/WKTField";
import IntField from "./types/IntField";
import FloatField from "./types/FloatField";
import DateField from "./types/DateField";
import MultiField from "./types/MultiField";

import { CircularProgress, Alert } from "@mui/material";

import CardImage from "../card/CardImage";
import { submitTasks } from "../../utils/utils";
import { useState } from "react";

const TaskForm = ({ task, settings, availableProjects }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  let defaultValues = {};
  for (const arg of task.args) {
    defaultValues[arg.name] = "";
  }
  const { form, use, setValue, runValidation, setError, getState, submit } =
    useForm({
      defaultValues,
      validate: (values) => {
        return Validate(values, settings, task.name);
      },
      onSubmit: (values) => {
        Object.keys(values).forEach((value) => {
          if (values[value].length === 0) {
            setError(value, "This field cannot be left blank.");
          }
        });
        let formState = getState();
        if (!Object.keys(formState.errors).length) {
          setLoading(true);
          submitTasks(task.name, values, setLoading, setErrorMessage);
        }
      },
      onError: (e) => {
        setLoading(false);
      },
    });

  const errors = use("errors");

  const createTaskField = (arg) => {
    if (arg.type === "str") {
      return (
        <StringField
          arg={arg}
          setValue={setValue}
          error={errors[arg.name]}
          runValidation={runValidation}
        />
      );
    } else if (arg.type === "wkt") {
      return (
        <WKTField
          arg={arg}
          error={errors[arg.name]}
          setErrorMessage={setErrorMessage}
          setValue={setValue}
          availableProjects={availableProjects}
          runValidation={runValidation}
        />
      );
    } else if (arg.type === "int") {
      return (
        <IntField arg={arg} setValue={setValue} error={errors[arg.name]} />
      );
    } else if (arg.type === "float") {
      return <FloatField arg={arg} error={errors[arg.name]} />;
    } else if (arg.type === "date") {
      return (
        <DateField
          arg={arg}
          setValue={setValue}
          error={errors[arg.name]}
          runValidation={runValidation}
        />
      );
    } else if (arg.type === "year") {
      return (
        <DateField
          arg={arg}
          showYearPicker
          error={errors[arg.name]}
          setValue={setValue}
          runValidation={runValidation}
        />
      );
    } else if (arg.type === "multi") {
      return (
        <MultiField
          arg={arg}
          setValue={setValue}
          runValidation={runValidation}
          error={errors[arg.name]}
        />
      );
    }
  };

  const handleSubmit = () => {
    submit();
  };

  return (
    <>
      <div className="task-header">
        <div className="task-header__card">
          <div className="task-header__card-left">
            <CardImage
              image={task.img_url}
              className="task-header__card-left-image"
              alt={task.display_name}
            />
          </div>
          <div className="task-header__card-right">
            <div className="task-header__card-right-title">
              <h1>
                <a target="_blank" href={task.info_url}>
                  {task.display_name}
                </a>
              </h1>
            </div>
            <div className="task-header__card-right-content">
              <p>{task.description}</p>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <>
          <div className="loading">
            <CircularProgress color="success" />
          </div>
        </>
      )}

      <form className={loading ? "hidden" : ""} ref={form}>
        {errorMessage && (
          <>
            <div className="error">
              <Alert severity="error">Error — {errorMessage}</Alert>
            </div>
          </>
        )}

        {task.args.map((arg) => {
          return (
            <div key={arg.name} className="form-row">
              {createTaskField(arg)}
            </div>
          );
        })}

        <div className="form-row">
          <input
            type="button"
            onClick={handleSubmit}
            className="task-submit"
            value="Submit"
          />
        </div>
      </form>
    </>
  );
};

export default TaskForm;
