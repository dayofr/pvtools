import "../App.css";
import DropzonePvgis from "../components/DropzonePvgis";
import DropzoneEnedis from "../components/DropzoneEnedis";
import Chart from "../components/Chart";
import { useEffect, useState } from "react";
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
  const [nameFile, setNameFile] = useState("");
  const [pvgis, setPvgis] = useState<{ data: {} }>(() => {
    const saved = localStorage.getItem(nameFile);
    if (saved === null) {
      return { data: {} };
    }
    const initialValue = JSON.parse(saved);
    return initialValue || { data: {} };
  });
  useEffect(() => {
    localStorage.setItem(nameFile, JSON.stringify(pvgis));
  }, [pvgis]);

  const [enedisFile, setEnedisFile] = useState(() => {
    for (let i = 0; i < 10; i++) {
      const tmpKey = localStorage.key(i);
      if (
        tmpKey !== null &&
        tmpKey !== "" &&
        tmpKey.toLowerCase().includes("enedis")
      ) {
        return tmpKey;
      }
    }
    return "";
  });
  const [enedis, setEnedis] = useState<{ data: {} }>(() => {
    const saved = localStorage.getItem(enedisFile);
    if (saved === null) {
      return { data: {} };
    }
    const initialValue = JSON.parse(saved);
    return initialValue || { data: {} };
  });
  useEffect(() => {
    localStorage.setItem(enedisFile, JSON.stringify(enedis));
  }, [enedis]);

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
    <div className="App">
      <div id="dropzones">
        <DropzonePvgis setPvgis={setPvgis} setNameFile={setNameFile} />
        <DropzoneEnedis
          setEnedis={setEnedis}
          setEnedisFile={setEnedisFile}
          enedisFile={enedisFile}
        />
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
