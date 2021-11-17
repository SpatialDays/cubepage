import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import Label from "../../generic/Label";
import ErrorField from "../../generic/ErrorField";

const DateField = ({ arg, showYearPicker, setValue, error, runValidation }) => {
  // Either get the current year, or get yesterdays date (JS doesnt make this easy)
  const [startDate, setStartDate] = useState(
    showYearPicker
      ? new Date(new Date().getFullYear().toString())
      : ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date())
  );

  useEffect(() => {
    if (arg.default) {
      setValue(arg.name, arg.default);
      setStartDate(new Date(arg.default));
    } else setValue(arg.name, startDate.toISOString().split("T")[0]);
  }, []);

  const handleChange = (name, value) => {
    setValue(name, value.toISOString().split("T")[0], { shouldValidate: true });
    setStartDate(value);
    runValidation();
  };

  return (
    <>
      <Label text={arg.display_name} tooltip={arg.description} />
      <DatePicker
        showYearDropdown
        onChange={(e) => handleChange(arg.name, e)}
        selected={startDate}
        showYearPicker={showYearPicker ? true : false}
        placeholder={arg.display_name}
      />
      <ErrorField error={error} />
    </>
  );
};

export default DateField;
