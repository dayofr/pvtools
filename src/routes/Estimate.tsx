import "../App.css";
import DropzonePvgis from "../components/DropzonePvgis";
import DropzoneEnedis from "../components/DropzoneEnedis";
import Chart from "../components/Chart";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Stats from "../components/Stats";

function Estimate() {
  const [month, setMonth] = useState("01");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setMonth(event.target.value as string);
  };

  const monthsName: Record<string, string> = {
    "01": "Janvier",
    "02": "Février",
    "03": "Mars",
    "04": "Avril",
    "05": "Mai",
    "06": "Juin",
    "07": "Juillet",
    "08": "Aout",
    "09": "Septembre",
    "10": "Octobre",
    "11": "Novembre",
    "12": "Decembre",
  };

  return (
    <div className="App" style={{ padding: "1rem" }}>
      <div id="dropzones">
        <DropzonePvgis />
        <DropzoneEnedis />
      </div>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Month"
          onChange={handleChange}
        >
          {[
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ].map((v) => {
            return (
              <MenuItem value={v} key={v}>
                {monthsName[v]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Chart month={month} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Stats month={month} />
      </div>
    </div>
  );
}

export default Estimate;
