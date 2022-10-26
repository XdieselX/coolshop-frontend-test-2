import { useEffect, useState } from "react";

export default function RowCalculator() {
  const [rows, setRows] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let count = 0;
    rows.filter(row => !row.disabled)
    .forEach(row => count += row.positive ? Number(row.value) : -Number(row.value));
    setResult(count)
  }, [rows]);

  function renderRows(){
    return (
      <ul>
        {rows.map((row, index) => (
          <li key={index}>
            <select value={rows[index].positive ? "+" : "-"} onChange={(event)=>{
              const temp_rows = [...rows];
              temp_rows[index].positive = event.target.value === "+";
              setRows(temp_rows);
            }}>
              <option defaultValue>+</option>
              <option>-</option>
            </select>
            <input
              type="text"
              value={row.value}
              onChange={(e) => {
                const newRows = [...rows];
                newRows[index].value = e.target.value;
                setRows(newRows);
              }}
            />
            <button onClick={()=>{
              const temp_rows = [...rows];
              temp_rows.splice(index, 1);
              setRows(temp_rows);
            }}>Delete</button>
            <button onClick={()=>{
              const newRows = [...rows];
              newRows[index].disabled = !newRows[index].disabled;
              setRows(newRows);
            }}>{rows[index].disabled ? "Enable" : "Disable"}</button>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className="RowCalculator">
      <button style={{
        color: "black"
      }} onClick={()=>{
        setRows([...rows, {
          positive: true,
          value: 0,
          disabled: false
        }])
      }}>Add Row</button>
      {renderRows()}
      <h4>Result : {result}</h4>
    </div>
  );
}
