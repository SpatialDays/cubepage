import Field from "../Field";
import Label from "../../generic/Label";
import ErrorField from "../../generic/ErrorField";
import { useEffect } from "react";

const IntField = ({ arg, error, setValue}) => {
  useEffect(() => {
    if (arg.default) setValue(arg.name, arg.default)
  }, [arg.default])

  return (
    <>
      <Label text={arg.display_name} tooltip={arg.description} />
      <Field
        label={arg.display_name}
        id={arg.display_name}
        min={arg.valid_values[0]}
        max={arg.valid_values[1]}
        name={arg.name}
        type={"number"}
        handleClick={(e) => setValue(arg.name, e.target.value)}
        defaultValue={arg.default}
        placeholder={arg.display_name}

        // set default value

      />


      <ErrorField error={error} />
    </>
  );
};

export default IntField;
