import Success from "../assets/images/success.svg";
import Back from "../components/generic/Back";

const Submission = () => {
  return (
    <>
      <div className="content">
        <Back />
        <div className="submission-container">
          <div className="submission-header">
            <div className="submission-header__image">
              <img alt="success tick" src={Success} />
            </div>
            <div className="submission-header__text">
              <h1>Task Submitted</h1>
            </div>
          </div>
          <div className="submission-text">
            <p>Your request is being processed. Your product will appear <a target="_blank" href="https://arcgis01.satapps.org/portal/home/">here</a> when it is ready.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Submission;
