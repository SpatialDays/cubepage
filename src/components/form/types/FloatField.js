import Label from "../../generic/Label";
import Field from "../Field";
import ErrorField from "../../generic/ErrorField";

const FloatField = ({ arg, error, setValue }) => {
  const handleChange = (name, value) => {
    setValue(name, parseFloat(value));
  };

  return (
    <>
      <Label text={arg.display_name} tooltip={arg.description} />
      <Field
        label={arg.display_name}
        id={arg.display_name}
        name={arg.name}
        type={"number"}
        onChange={(e) => handleChange(arg.name, e.target.value)}
        min={arg.valid_values[0]}
        max={arg.valid_values[1]}
        step={"0.1"}
        placeholder={arg.display_name}
      />
      <ErrorField error={error} />
    </>
  );
};

export default FloatField;
