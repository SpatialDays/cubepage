import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <div className="content">
        <div className="content__image">
          <img src="ipp-commonsensing-logo.png" alt="login" />
        </div>
        <div className="content__title">
          <h1 key="widget">Login</h1>
        </div>
        <div className="content__subtitle">
          <div className="content__subtitle-text">
            <small>
              Welcome to the CommonSensing Cube Page. Please login to view and launch cube products.<br/><br/>
              If you don't have an account,  <a target="_blank" rel="noreferrer" href="http://localhost:3434/register">please register here</a> and wait for admin approval.
              <br />
              <br />
            </small>
          </div>
        </div>
          <LoginForm />
      </div>

      <div className="login_form">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;

//
