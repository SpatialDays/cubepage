import { useHistory } from "react-router";

const Back = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <span className="back-button" onClick={goBack}>
        <svg
          aria-hidden="true"
          focusable="false"
          width="20px"
          height="20px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              d="M15 4l-8 8l8 8"
              stroke="#626262"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
        <p>Back</p>
      </span>
    </>
  );
};

export default Back;
