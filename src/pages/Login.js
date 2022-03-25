import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <div className="content login_form">
        <div className="login_form--title">
          <h1>Login</h1>
        </div>
          <LoginForm />
      </div>
    </>
  );
};

export default Login;
