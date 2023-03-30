import { useForm, useFormState } from "react-cool-form";
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

const TaskForm = ({
  task,
  settings,
  availableProjects,
  fetchedTask,
  hasTaskID,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  let defaultValues = {};

  if (!hasTaskID) {
    for (const arg of task.args) {
      defaultValues[arg.name] = "";
    }
  } else {
    defaultValues = fetchedTask.args;
  }

  const { form, use, setValue, runValidation, setError, getState, submit } =
    useForm({
      id: "task-form",
      defaultValues,
      validate: async (values) => {
        // The 0 validation error: values.waterThresh is blank at this point
        // FIX:
        // gets the value of the 'Water Threshold' element (waterThresholdElementValue)
        // if the value == 0, then set values.waterThresh = waterThresholdElementValue
        let waterThresholdElementValue = document.getElementById('Water Threshold');
        if (waterThresholdElementValue && waterThresholdElementValue.value == 0){
          values.waterThresh = waterThresholdElementValue.value;
        };

        const errors = await Validate(values, settings, task.name);
        console.log(`Errors are: `, errors);
        return errors;
      },
      onSubmit: (values) => {

        // sets vars to store values of the upper and lower thresholds if they exist in the form
        let minC;
        let maxC;
        let tide_range_lower;
        let tide_range_upper;

        Object.keys(values).forEach((value) => {
          if (values[value].length === 0) {
            setError(value, "This field cannot be left blank.");
          };

          // if any of the upper and lower thresholds exist in the form, their value is assigned
          if (value === 'minC') {
            minC = values[value];
          } else if (value === 'maxC') {
            maxC = values[value];
          } else if (value === 'tide_range_lower') {
            tide_range_lower = values[value];
          } else if (value === 'tide_range_upper') {
            tide_range_upper = values[value];
          };

        });

        // checks if Vegitation Threshold Lower > Vegitation Threshold Upper and raises an error on both fields
        if (maxC > minC) {
          setError('maxC', "Lower threshold cannot be larger than upper threshold.");
          setError('minC', "Upper threshold cannot be smaller than lower threshold.");
        };
        // checks if Tidal range proximity lower > Tidal range proximity upper and raises an error on both fields
        if (tide_range_lower > tide_range_upper) {
          setError('tide_range_lower', "Lower bound cannot be larger than upper bound.");
          setError('tide_range_upper', "Upper bound cannot be smaller than lower bound.");
        };

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

  // if not hasTaskID then set the value to all the args
  if (hasTaskID && fetchedTask) {
    for (const arg of task.args) {
      arg.default = fetchedTask.args[arg.name];
    }
  }

  const FieldMessage = (name) => {
    // Supports single-value-pick, array-pick, and object-pick data formats
    const [error, value] = useFormState(["errors." + name, "values." + name], {
      formId: "task-form",
    });

    return <p>{error}</p>;
  };

  const errors = use("errors");

  const createTaskField = (arg) => {
    if (arg.type === "str") {
      return (
        <>
          <StringField
            arg={arg}
            setValue={setValue}
            error={errors[arg.name]}
            runValidation={runValidation}
          />
          <FieldMessage name={arg.name} />
        </>
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
      return (
        <FloatField arg={arg} setValue={setValue} error={errors[arg.name]} />
      );
    } else if (arg.type === "date") {
      return (
        <>
          <DateField
            arg={arg}
            setValue={setValue}
            error={errors[arg.name]}
            runValidation={runValidation}
            onChange={(e) => {
              // force re-render and run validation
              setValue(arg.name, e.target.value, { shouldValidate: true });
              runValidation();
            }}
          />
          <FieldMessage name={arg.name} />
        </>
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
                <a target="_blank" rel="noreferrer" href={"/docs/" + task.name}>
                  {task.display_name}
                  <img src="../images/icons/info-button.png" 
                    alt="info button"
                    className="task-header__card-right-title-info"
                  />
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
            disabled={errorMessage && errorMessage.length > 0}
          />
        </div>
      </form>
    </>
  );
};

export default TaskForm;
