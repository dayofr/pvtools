import Datapoint from "../Datapoint";
import { parse } from "papaparse";

export default (binaryStr: string): { data: { [index: string]: any } } => {
  const json = {
    data: {} as { [index: string]: any },
  };

  // Do whatever you want with the file contents
  const datapoints: Datapoint[] = [];
  const parsed = parse<string>(binaryStr);
  const sliced: string[] = parsed.data.slice(11);
  const regex = /([0-9]{4})([0-9]{2})([0-9]{2}):([0-9]{2})[0-9]{2}/;
  sliced.forEach((value) => {
    const d = value[0].match(regex);
    if (d !== null)
      datapoints.push(new Datapoint(d[1], d[2], d[3], d[4], value[1]));
  });

  const res = datapoints.reduce(
    (group: { [index: string]: any }, datapoint) => {
      const { month } = datapoint;
      group[month] = group[month] ?? [];
      group[month].push(datapoint);
      return group;
    },
    {}
  );

  for (let m in res) {
    res[m] = res[m].groupBy(({ hour }: { hour: string }) => hour);
  }
  for (let m in res) {
    json.data[m] = {};
    for (let d in res[m]) {
      json.data[m][d] =
        res[m][d].reduce(
          (curr: number, b: Datapoint) => curr + b.production,
          0
        ) / res[m][d].length;
    }
  }

  return json;
};
