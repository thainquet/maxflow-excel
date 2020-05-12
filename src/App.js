/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";

const data = [
  { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
  { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
  { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
  { id: 4, name: "Asad", age: 25, email: "asad@email.com" },
];

const Array2D = (row, col, value) =>
  [...Array(row)].map((x) => Array(col).fill(value));

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function App() {
  const [rowNum, setRowNum] = useState(6);
  const [colNum, setColNum] = useState(11);
  const [initArray, setInitArray] = useState([]);
  // For context menu
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  let count = -1;
  const handleContextClick = (event) => {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setTop(clickY + 5);
    setLeft(clickX + 5);
    document.elementFromPoint(clickX, clickY).click();
    setVisible(true);
  };
  useEffect(() => {
    window.addEventListener("contextmenu", handleContextClick);
  });

  useEffect(() => {
    const handleContextClickOutside = (event) => {
      setVisible(false);
      window.removeEventListener("contextmenu", handleContextClick);
    };
    window.addEventListener("click", handleContextClickOutside);
    return () => window.removeEventListener("click", handleContextClickOutside);
  }, [visible]);

  const handleClickCreate = () => {
    let arr = [...Array(rowNum)].map((x) => Array(colNum).fill(makeid(5)));
    arr.forEach((i) => {
      i[0] = arr.indexOf(i);
    });
    for (let i = 0; i < arr[0].length; i++) {
      arr[0][i] = ++count;
    }
    setInitArray(arr);
  };

  const handleClickCell = (e) => {
    let thisTH = e.target;
    let thisTR = e.target.parentNode;
    let allTR = thisTH.parentNode.parentNode.childNodes;
    allTR.forEach((tr) => {
      tr.style.backgroundColor = null;
      tr.childNodes.forEach((th) => (th.style.backgroundColor = null));
    });
    if (thisTH.cellIndex === 0 && thisTR.rowIndex === 0) {
      thisTH.style.backgroundColor = "#e6efff";
    } else if (thisTH.cellIndex === 0 && thisTR.rowIndex !== 0) {
      thisTR.style.backgroundColor = "#e6efff";
    } else if (thisTH.cellIndex !== 0 && thisTR.rowIndex === 0) {
      let index = thisTH.cellIndex;
      allTR.forEach(
        (tr) => (tr.childNodes[index].style.backgroundColor = "#e6efff")
      );
    } else {
      thisTR.style.backgroundColor = "";
      thisTH.style.backgroundColor = "#e6efff";
      thisTH.contentEditable = "true";
    }
  };

  const handleChangeCell = (e) => {
    let tungdo = e.target.parentNode.rowIndex;
    let hoanhdo = e.target.cellIndex;

    let data = e.target.innerHTML;
    let tempArr = [...initArray];
    tempArr[tungdo][hoanhdo] = data;
    setInitArray(tempArr);
  };

  const menuStyle = {
    position: "absolute",
    top: `${top}px`,
    left: `${left}px`,
  };

  return (
    <div>
      <div className={visible ? "menu" : "menu hiden"} style={menuStyle}>
        <div className="menu-line">Insert column right</div>
        <div className="menu-line">Insert row to below</div>
      </div>
      <input
        placeholder="row"
        onChange={(e) => setRowNum(parseInt(e.target.value) + 1)}
      />
      <input
        placeholder="column"
        onChange={(e) => setColNum(parseInt(e.target.value) + 1)}
      />
      <button onClick={() => handleClickCreate()} onChange={handleChangeCell}>
        Create
      </button>
      <div className="scrollable">
        <table>
          <tbody>
            {initArray &&
              initArray.map((i) => (
                <>
                  <tr>
                    {i.map((j) => (
                      <th onClick={handleClickCell}>{j}</th>
                    ))}
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// const App = () => (
//   <div style={{ width: 'max-content' }}>
//     <Table x={50} y={10} />
//   </div>
// )

export default App;
