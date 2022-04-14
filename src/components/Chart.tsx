import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart({ month }: { month: string }) {
  const d: { name: string; value0: number; value1: number; enedis: number }[] =
    [];

  const lsKeys = [];

  for (let i = 0; i < 10; i++) {
    const tmpKey = localStorage.key(i);
    if (tmpKey !== null && tmpKey !== "") {
      lsKeys.push(tmpKey);
    }
  }

  const pvgis: {
    data: {
      [index: string]: {
        [index: string]: number;
      };
    };
  }[] = [];
  let enedis: { data: {} } = { data: {} };
  for (const lsKey of lsKeys) {
    if (lsKey.toLowerCase().includes("enedis")) {
      enedis = JSON.parse(localStorage.getItem(lsKey) || "{}");
    } else {
      pvgis.push(JSON.parse(localStorage.getItem(lsKey) || "{}"));
    }
  }
  console.log(pvgis);
  let max = 0;

  [
    "00",
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
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ].forEach((hour) => {
    const tmp: { [index: string]: number | string } = { name: hour, enedis: 0 };
    pvgis.forEach((value, index) => {
      for (let v in value.data[month]) {
        const v = value.data[month][hour];
        tmp["value" + index] = v;
        if (v > max) {
          max = v;
        }
      }
    });
    tmp.enedis = enedis.data[month][hour];
    d.push(tmp);
  });

  d.sort((a, b) => (a.name > b.name ? 1 : a.name > b.name ? -1 : 0));

  const colors = ["red", "green", "blue", "orange", "purple"];
  let valueIndex = -1;
  return (
    <LineChart
      width={1400}
      height={400}
      data={d}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 5000]} />
      <Tooltip />
      <Legend />
      {lsKeys.map((value, index) => {
        if (value.startsWith("pvgis__")) {
          valueIndex++;
          return (
            <Line
              name={value}
              type="monotone"
              dataKey={"value" + valueIndex}
              stroke={colors[valueIndex]}
              key={index}
            />
          );
        }
      })}
      <Line name="Enedis" type="monotone" dataKey="enedis" stroke="black" />
    </LineChart>
  );
}
