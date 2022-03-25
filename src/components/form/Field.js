const Field = ({ id, error, field, handleClick, onCustomChange, ...rest }) => (
  <>
    <input onClick={handleClick && handleClick} onChange={onCustomChange} id={id} {...rest} />
  </>
);

export default Field;
