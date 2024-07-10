import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useLogin from "../hooks/useLogin";

const RegistrationScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, login] = useLogin();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await axios.post(
        "https://ffxiv-relic-tracker-api.vercel.app/api/v1/users/register",
        {
          username,
          email,
          password,
        }
      );

      login(e, { email, password });
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="login">
        <form onSubmit={handleSubmit} className="form">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            Sign up
          </button>
          {error && <p>{error}</p>}
        </form>
        <div className="text-center mt-4">
          Go to
          <Link to="/login" className="font-bold text-blue-400">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
