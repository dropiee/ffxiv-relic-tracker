import { useContext, useState } from "react";
import MyContext from "../MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogin = () => {
  const { user, setIsLoggedIn, setUser } = useContext(MyContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, userCredentials) => {
    try {
      e.preventDefault();

      const {
        data: { data },
      } = await axios.post(
        "https://ffxiv-relic-tracker-api.vercel.app/api/v1/users/login",
        {
          email: userCredentials.email,
          password: userCredentials.password,
        }
      );

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true);
      setUser(data);
      navigate("/welcome");
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return [error, handleLogin];
};

export default useLogin;
