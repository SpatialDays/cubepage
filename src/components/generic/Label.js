import ReactTooltip from "react-tooltip";

const Label = ({ text, tooltip }) => {
  return (
    <>
      <ReactTooltip />
      <label data-tip={tooltip} htmlFor={{ text }}>
        {text}
      </label>
    </>
  );
};

export default Label;
