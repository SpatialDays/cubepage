import { useEffect, useState } from "react";
import Field from "../Field";
import DrawMap from "../../generic/DrawMap";
import Label from "../../generic/Label";
import ErrorField from "../../generic/ErrorField";

const WKTField = ({ arg, error, runValidation, setValue }) => {
  const [map, showMap] = useState(false);
  const [AOI, setAOI] = useState("");

  const handleClick = () => {
    showMap(true);
  };

  useEffect(() => {
    runValidation();
    setValue(arg.name, AOI);
  }, [AOI, setValue, runValidation, arg.name]);

  return (
    <>
      <Label text={arg.display_name} tooltip={arg.description} />
      <Field
        autoComplete={"off"}
        label={arg.display_name}
        id={arg.display_name}
        readOnly
        name={arg.name}
        value={AOI}
        onClick={handleClick}
        placeholder={"Click here to use the AOI drawing tool"}
      />
      {map && (
        <>
          <DrawMap setAOI={setAOI} showMap={showMap} />
        </>
      )}
      <ErrorField error={error} />
    </>
  );
};

export default WKTField;
