import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, login] = useLogin();

  const userCredentials = {
    email,
    password,
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="login">
        <form onSubmit={(e) => login(e, userCredentials)} className="form">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button">
            Sign in
          </button>
          {error && <p>{error}</p>}
        </form>
        <div>
          Don't have an account yet? Click
          <Link to="/register" className="font-bold text-blue-400">
            &nbsp;here&nbsp;
          </Link>
          to sign up.
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
