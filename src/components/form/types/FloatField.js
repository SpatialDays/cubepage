import Label from "../../generic/Label";
import Field from "../Field";
import ErrorField from "../../generic/ErrorField";

const FloatField = ({ arg, error }) => {
  return (
    <>
      <Label text={arg.display_name} tooltip={arg.description} />
      <Field
        label={arg.display_name}
        id={arg.display_name}
        name={arg.name}
        type={"number"}
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
