import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Characters from "../components/Characters/Characters";
import Header from "../components/Header";

const WelcomeScreen = () => {
  const [field, setField] = useState("");
  const [sort, setSort] = useState("");
  return (
    <>
      <Header />
      <div className="text-center">
        <Link to="/create-character" className="button">
          Create New Character
        </Link>
        <div className="mt-5 flex gap-2 justify-center items-center">
          <label>Sort by:</label>
          <select onChange={(e) => setField(e.target.value)}>
            <option value="name">Name</option>
            <option value="world">World</option>
          </select>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <Characters sort={sort} field={field} />
    </>
  );
};

export default WelcomeScreen;
