import React from "react";
import "./style.css";

const Selectdown = ({onChange, id }) => {
const options = [
    {name: "7 Days", value: 7},
    {name: "1 Month", value: 30},
    {name: "3 Month", value: 90},
    {name: "1 Year", value: 365},
    {name: "All time", value: 0},
    ]

  return (
    <select className="select" onChange={onChange}>
      {options.map((data, i) => {
        return (
          <option
            key={i}
            selected={id === data.value ? "selected" : ""}
            value={data.value}
          >
            {data.name}
          </option>
        );
      })}
    </select>
  );
};

export default Selectdown;
