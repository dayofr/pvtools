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
  const d = [];

  const lsKeys = [];

  for (let i = 0; i < 10; i++) {
    const tmpKey = localStorage.key(i);
    if (tmpKey !== null && tmpKey !== "") {
      lsKeys.push(tmpKey);
    }
  }

  const pvgis = [];
  for (const lsKey of lsKeys) {
    pvgis.push(JSON.parse(localStorage.getItem(lsKey)));
  }

  let max = 0;

  [
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
    "24",
  ].forEach((hour) => {
    const tmp = { name: hour };
    pvgis.forEach((value, index) => {
      for (let v in value.data[month]) {
        const v = value.data[month][hour];
        tmp["value" + index] = v;
        if (v > max) {
          max = v;
        }
      }
    });
    d.push(tmp);
  });

  d.sort((a, b) => (a.name > b.name ? 1 : a.name > b.name ? -1 : 0));

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
      <YAxis domain={[0, 1500]} />
      <Tooltip />
      <Legend />
      <Line name={lsKeys[0]} type="monotone" dataKey="value0" stroke="red" />
      <Line name={lsKeys[1]} type="monotone" dataKey="value1" stroke="blue" />
      <Line name={lsKeys[2]} type="monotone" dataKey="value2" stroke="green" />
      <Line name={lsKeys[3]} type="monotone" dataKey="value3" stroke="orange" />
      <Line name={lsKeys[4]} type="monotone" dataKey="value3" stroke="black" />
    </LineChart>
  );
}
