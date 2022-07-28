import { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import Label from "../../generic/Label";
import ErrorField from "../../generic/ErrorField";

const MultiField = ({ arg, setValue, error, runValidation }) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (arg.default) {
      setValue(arg.name, [arg.default]);
      setSelected([{ label: arg.default, value: arg.default }]);
    }
  }, [arg.default]);

  const handleChange = (name, value) => {
    setValue(
      name,
      value.map((v) => {
        return v.value;
      }),
      { shouldValidate: true }
    );
    setSelected(value);
    runValidation()
  };

  const options = arg.valid_values.map((value) => {
    return { value, label: value };
  });

  return (
    <>
      <Label text={arg.display_name} tooltip={arg.description} />
      <MultiSelect
        options={options}
        value={selected}
        onChange={(e) => handleChange(arg.name, e)}
        name={arg.name}
        labelledBy="Select"
        className="multiSelect"
      />
      <ErrorField error={error} />
    </>
  );
};

export default MultiField;
