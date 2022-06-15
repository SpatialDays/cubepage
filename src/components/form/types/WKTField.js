import { useEffect, useState } from "react";
import Field from "../Field";
import DrawMap from "../../generic/DrawMap";
import Label from "../../generic/Label";
import ErrorField from "../../generic/ErrorField";
import axios from "axios";

const WKTField = ({
  arg,
  error,
  setErrorMessage,
  runValidation,
  setValue,
  availableProjects,
}) => {
  const countries = {
    fiji: {
      value: "Fiji",
      center: [-17.5, 178.5],
      default: true,
      bounds:
        "MULTIPOLYGON (((-175 -12,-179.99999 -12,-179.99999 -20,-175 -20,-175 -12)), ((175 -12,179.99999 -12,179.99999 -20,175 -20,175 -12)))",
    },
    vanuatu: {
      value: "Vanuatu",
      center: [-17.5, 168.5],
      bounds:
        "POLYGON((159.08203125000003 -23.88583769986199,175.56152343750003 -23.88583769986199,175.56152343750003 -11.350796722383672,159.08203125000003 -11.350796722383672,159.08203125000003 -23.88583769986199))",
    },
    solomon: {
      value: "Solomon Islands",
      center: [-8.5, 159.5],
      bounds:
        "POLYGON((147.26074218750003 -12.683214911818654,163.52050781250003 -12.683214911818654,163.52050781250003 -2.767477951092084,147.26074218750003 -2.767477951092084,147.26074218750003 -12.683214911818654))",
    },
  };

  const [selectedCountry, setSelectedCountry] = useState(
    availableProjects[window.sessionStorage.getItem("defaultCountryIndex") || 0] 
  );
  const [map, showMap] = useState(false);
  const [AOI, setAOI] = useState("");

  const handleClick = () => {
    showMap(true);
  };

  useEffect(() => {
    runValidation();
    setValue(arg.name, AOI);
  }, [AOI, setValue, runValidation, arg.name]);

  useEffect(() => {
    if (arg.default) setValue(arg.name, arg.default);
  }, [arg.default]);

  useEffect(() => {
    if (AOI.length > 0) {
      axios
        .post(process.env.REACT_APP_PORTAL_URL + "/validate-aoi", {
          data: {
            token: window.localStorage.getItem("cubetoken"),
            aoi: AOI,
          },
        })
        .then(function () {
          setErrorMessage("");
        })
        .catch(function (error, data) {
          const response = error.response.data;
          let errorMsg = "";
          if (Array.isArray(response) && response.length > 0) {
            let errors = [];
            response.forEach((element) => {
              errors.push(element.Error);
            });

            errorMsg = errors.join(", \n");
          }
          setErrorMessage(errorMsg);
        });
    }
  }, [AOI]);

  return (
    <>
      <div className="country-selector">
        {availableProjects.map((country, index) => (
          <div
            className={`country-selector-container  ${
              selectedCountry === country ? "selected" : ""
            }`}
            onClick={() => {
              setSelectedCountry(country);
              setAOI("");

              // Save the index to session storage
              window.sessionStorage.setItem("defaultCountryIndex", index);
            }}
          >
            <input
              type="radio"
              value={country}
              checked={selectedCountry === country}
            />
            <span>{countries[country].value}</span>
          </div>
        ))}
      </div>
      <Label text={arg.display_name} tooltip={arg.description} />
      <Field
        autoComplete={"off"}
        label={arg.display_name}
        id={arg.display_name}
        readOnly
        name={arg.name}
        defaultValue={arg.default}
        //value={AOI}
        onClick={handleClick}
        placeholder={"Click here to use the AOI drawing tool"}
      />
      {map && (
        <>
          <DrawMap
            setAOI={setAOI}
            showMap={showMap}
            country={countries[selectedCountry]}
          />
        </>
      )}
      <ErrorField error={error} />
    </>
  );
};

export default WKTField;
