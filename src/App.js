import React, { useState } from "react";
import "./App.css";
import { puzzleData } from "./data";
import PuzzleContainer from "./puzzleContainer";

function App() {
  const [selectedPuzzle, setSelectedPuzzle] = useState(puzzleData.puzzle[0]);

  //changing state in dropdown
  const handleChange = (e) => {
    let selected = puzzleData.puzzle.filter(
      (item) => item.name === e.target.value
    );

    setSelectedPuzzle(selected[0]);
  };

  return (
    <div className="app-conatiner">
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "26px",
          fontWeight: "bold",
        }}
      >
        <span
          style={{
            background: "#009270",
            padding: "5px",
            marginRight: "10px",
            borderRadius: "10px",
          }}
        >
          <img
            src="https://www.cricbuzz.com/images/cb_logo.svg"
            alt="img"
            width="74"
          />
        </span>
        Cricket Word Search
      </div>
      <div className="name-dropdown">
        <label for="select-puzzle">Select Puzzle :</label>
        <select
          value={selectedPuzzle.name}
          onChange={handleChange}
          style={{ padding: "10px", marginLeft: "10px" }}
        >
          {puzzleData.puzzle.map((item) => {
            return <option value={item.name}>{item.name}</option>;
          })}
        </select>
      </div>
      <PuzzleContainer selectedPuzzle={selectedPuzzle} />
    </div>
  );
}

export default App;
