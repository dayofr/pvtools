import "./App.css";
import Menu from "./components/Menu";
import DropzonePvgis from "./components/DropzonePvgis";
import DropzoneEnedis from "./components/DropzoneEnedis";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

function App() {
  const [month, setMonth] = useState("01");
  const [nameFile, setNameFile] = useState("");

  interface pvgis {
    data: {};
  }

  const [pvgis, setPvgis] = useState<pvgis>(() => {
    // getting stored value
    const saved = localStorage.getItem(nameFile);
    if (saved === null) {
      return { data: {} };
    }
    const initialValue = JSON.parse(saved);
    return initialValue || { data: {} };
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(nameFile, JSON.stringify(pvgis));
  }, [pvgis]);

  const handleChange = (event: SelectChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

  return (
    <div className="App">
      <Menu />
      <div id="dropzones">
        <DropzonePvgis setPvgis={setPvgis} setNameFile={setNameFile} />
        <DropzoneEnedis setPvgis={setPvgis} setNameFile={setNameFile} />
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
                {v}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Chart month={month} />
      </div>
    </div>
  );
}

export default App;
