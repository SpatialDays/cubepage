import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <>
      <div className="content login_form">
        <h1>Login</h1>
        <div className="form-row">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
