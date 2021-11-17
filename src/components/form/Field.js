const Field = ({ id, error, field, handleClick, ...rest }) => (
  <>
    <input onClick={handleClick && handleClick} id={id} {...rest} />
  </>
);

export default Field;
