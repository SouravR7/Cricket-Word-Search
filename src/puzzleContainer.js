import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./App.css";

export default function PuzzleContainer(props) {
  const [enterInput, setEnterInput] = useState("");

  const [matchedPoints, setMatchedPoints] = useState([]);

  const [countMatched, setCountMatched] = useState(0);

  //changeing state while select different puzzle
  useEffect(() => {
    setMatchedPoints([]);
    setEnterInput("");
    setCountMatched(0);
  }, [props.selectedPuzzle.name]);

  let totalWords = props.selectedPuzzle.find_words.length;

  //counting rows and columns
  let row =
    props.selectedPuzzle.Alphabet_grid.length > 0 &&
    props.selectedPuzzle.Alphabet_grid.length;
  let column =
    props.selectedPuzzle.Alphabet_grid.length > 0 &&
    props.selectedPuzzle.Alphabet_grid[0].split("").length;

  let grid = [];

  //creating grid from the given puzzle grid
  props.selectedPuzzle.Alphabet_grid.length > 0 &&
    props.selectedPuzzle.Alphabet_grid.map((item) => grid.push(item.split("")));

  const allPossibleSearch = (grid, row, col, word, R, C, x, y) => {
    if (grid[row][col] !== word[0]) return false; //checking for 1st character

    let wordLength = word.length;

    // Search word in all 8 directions
    for (let i = 0; i < 8; i++) {
      // Initialize starting point for current direction
      let k;
      let checkedRow = row + x[i];
      let checkedColumn = col + y[i];

      let points = [
        {
          r: 0,
          c: 0,
        },
      ];

      // checking for remaining characters
      for (k = 1; k < wordLength; k++) {
        // If out of bound break
        if (
          checkedRow >= R ||
          checkedRow < 0 ||
          checkedColumn >= C ||
          checkedColumn < 0
        ) {
          break;
        }

        // If not matched, break
        if (grid[checkedRow][checkedColumn] !== word[k]) {
          break;
        }

        // Moving in particular direction
        if (k === 1) {
          points.splice(0, points.length); //deleting previous points because it's not a match
        }
        let newObj = {
          r: checkedRow,
          c: checkedColumn,
        };
        points.push(newObj);
        checkedRow += x[i];
        checkedColumn += y[i];
      }
      if (k === wordLength) {
        //console.log(x[i], y[i]);
        points.push({
          r: points[0].r - x[i],
          c: points[0].c - y[i],
        });

        setMatchedPoints([...matchedPoints, ...points]); //maintaing the state of all matched points
        return true;
      }
    }
    return false;
  };

  const searchingWard = (grid, R, C, word, x, y) => {
    let found = false;

    //O(n^2) solution
    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (allPossibleSearch(grid, row, col, word, R, C, x, y)) {
          //console.log(`Word found at ${row} ${col}`);
          found = true;
        }
      }
    }
    if (!found) {
      toast.error("Word not found !", { toastId: "notfound_error" });
    } else {
      let totalMatched = countMatched + 1;
      setCountMatched(totalMatched);
      if (totalWords === totalMatched) {
        toast.success("Hurry Well played!!", { toastId: "allMatched_sucess" });
      }
    }
  };
  const handleSubmit = () => {
    // For searching in all 8 direction
    let x = [-1, -1, -1, 0, 0, 1, 1, 1];
    let y = [-1, 0, 1, -1, 1, -1, 0, 1];
    searchingWard(grid, row, column, enterInput.toUpperCase(), x, y);
  };

  return (
    <div className="puzzle-container">
      <div className="input-container">
        <input
          type="text"
          value={enterInput}
          onChange={(e) => setEnterInput(e.target.value)}
          placeholder="Enter the word"
          style={{ padding: "10px", width: "250px" }}
        />
        <span
          style={{
            padding: "10px",
            backgroundColor: "#009270",
            color: "white",
            marginLeft: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Submit
        </span>
      </div>
      <div className="grid-container">
        <div className="letter-grid">
          {props.selectedPuzzle.Alphabet_grid.map((item, Rindex) => {
            return (
              <div
                style={{
                  padding: "0px 5px",
                  display: "flex",
                }}
              >
                {item.split("").map((items, Cindex) => {
                  return (
                    <div
                      style={{
                        border: "1px solid black",
                        padding: "4px",
                        height: "25px",
                        width: "25px",
                        textAlign: "center",
                      }}
                      className={
                        matchedPoints.length > 0
                          ? matchedPoints.findIndex(
                              (item) => item.c === Cindex && item.r === Rindex
                            ) > -1
                            ? "yellowC"
                            : null
                          : null
                      }
                    >
                      {items}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
