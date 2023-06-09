import React, { useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState({});
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = async () => {
    const newValues = await axios.get("/api/values/current");
    setValues(newValues.data);
  };

  const fetchIndexes = async () => {
    const newIndexes = await axios.get("/api/values/all");
    setSeenIndexes(newIndexes.data);
  };

  const renderSeenIndexes = () => {
    //return seenIndexes.map(({ number }) => number.join(", "));
  };

  const renderCalculatedValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          for index {key} I Calculated {values[key]}
        </div>
      );
    }
    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: index,
    });

    setSeenIndexes("");
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label> Enter your index</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3> Indexes I have seen:</h3>
      {renderSeenIndexes()}
      <h3> Calculated Values</h3>
      {renderCalculatedValues()}
    </>
  );
};

export default Fib;
