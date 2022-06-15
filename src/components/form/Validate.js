import { convertDateToString } from "../../utils/utils";

const Validate = (values, settings, taskName) => {
  var errors = {};
  var parsedSettings = {};

  Object.keys(settings).forEach((setting) => {
    var checkId = setting;
    if (setting === "platform" && !Object.keys(values).includes(setting)) {
      checkId = "baseline_platform";
    }
    if (Object.keys(values).includes(checkId)) {
      const conditions = settings[setting];
      conditions.forEach((condition) => {
        if (
          (Array.isArray(values[checkId]) &&
            values[checkId].includes(condition.name)) ||
          values[checkId] === condition.name
        ) {
          condition.conditions.forEach((c) => {
            if (
              (c.processes && c.processes.includes(taskName)) ||
              !c.processes
            ) {
              let ids = c.id;
              let range = c.value;
              ids.forEach((id) => {
                if (Object.keys(values).includes(id)) {
                  if (!parsedSettings[id]) parsedSettings[id] = [];
                  if (parsedSettings[id]) {
                    parsedSettings[id].push(range);
                  }
                }
              });
            }
          });
        }
      });
    }
  });
  var validatedRanges = [];
  Object.keys(parsedSettings).forEach((setting) => {
    var minValues = [];
    var maxValues = [];
    parsedSettings[setting].forEach((range) => {
      minValues.push(range[0]);
      if (range.length > 1) {
        maxValues.push(range[1]);
      }
    });
    var minBound, maxBound;
    if (typeof minValues[0] === "number") {
      minBound = Math.max.apply(null, minValues);
      maxBound = Math.min.apply(null, maxValues);
      if (minBound < maxBound)
        validatedRanges.push({
          id: setting,
          type: "number",
          minBound,
          maxBound,
        });
      else errors[setting] = "Impossible bounds";
    }
    // Must be Date
    if (typeof minValues[0] === "string") {
      minBound = new Date(minValues[0]);
      for (let i = 1; i < minValues.length; i++) {
        if (new Date(minValues[i]) > minBound) {
          minBound = new Date(minValues[i]);
        }
      }
      if (maxValues.length) {
        maxBound = new Date(maxValues[0]);
        for (let i = 1; i < maxValues.length; i++) {
          if (new Date(maxValues[i]) < maxBound) {
            maxBound = new Date(maxValues[i]);
          }
        }
        // If there is only one index in the array, then max date is todays date
      } else {
        maxBound = new Date();
      }
      if (minBound < maxBound)
        validatedRanges.push({ id: setting, type: "date", minBound, maxBound });
      else errors[setting] = "Impossible bounds";
    }
  });
  // Check if the values are within the bounds
  validatedRanges.forEach((range) => {
    if (
      values[range.id] < range.minBound ||
      values[range.id] > range.maxBound ||
      new Date(values[range.id]) < range.minBound ||
      new Date(values[range.id]) > range.maxBound
    ) {
      if (values[range.id]) {
        if (range.type === "date") {
          errors[range.id] =
            "Must be between " +
            convertDateToString(new Date(range.minBound)) +
            " and " +
            convertDateToString(new Date(range.maxBound));
        } else if (range.type === "number") {
          errors[range.id] =
            "Must be between " + range.minBound + " and " + range.maxBound;
        }
      }
    }
  });
  return errors;
};
export default Validate;
