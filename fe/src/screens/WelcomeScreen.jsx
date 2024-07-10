import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../MyContext";
import Characters from "../components/Characters/Characters";
import Header from "../components/Header";

const WelcomeScreen = () => {
  const {
    user: { username },
  } = useContext(MyContext);
  return (
    <>
      <Header />
      <div className="text-center">
        <Link to="/create-character" className="button">
          Create New Character
        </Link>
      </div>
      <Characters />
    </>
  );
};

export default WelcomeScreen;
