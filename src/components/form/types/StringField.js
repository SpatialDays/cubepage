import Field from "../Field";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Label from "../../generic/Label";
import ErrorField from "../../generic/ErrorField";
import { useEffect } from "react";

const StringField = ({ arg, setValue, error, runValidation }) => {
  useEffect(() => {
    if (arg.default) setValue(arg.name, arg.default);
  }, [arg.default]);

  

  let isOptions = arg.valid_values ? true : false;

  const options = arg.valid_values.map((value) => {
    return { value, label: value };
  });

  const handleChange = (name, value) => {
    setValue(name, value);
    runValidation();
  };

  return (
    <>
      {isOptions ? (
        <>
          <Label text={arg.display_name} tooltip={arg.description} />
          <Dropdown
            options={options}
            name={arg.name}
            value={arg.default}
            id={arg.display_name}
            onChange={(e) => handleChange(arg.name, e.value)}
            placeholder="Select an option"
          />
        </>
      ) : (
        <Field
          label={arg.display_name}
          defaultValue={arg.default}
          id={arg.display_name}
          name={arg.name}
          placeholder={arg.display_name}
        />
      )}
      <ErrorField error={error} />
    </>
  );
};

export default StringField;
