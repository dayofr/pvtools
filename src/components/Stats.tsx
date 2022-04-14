export default function Stats({ month }: { month: string }) {
  const d: {
    name: string;
    value0: number;
    value1: number;
    value2?: number;
    value3?: number;
    enedis: number;
  }[] = [];

  const lsKeys = [];

  for (let i = 0; i < 10; i++) {
    const tmpKey = localStorage.key(i);
    if (tmpKey !== null && tmpKey !== "") {
      lsKeys.push(tmpKey);
    }
  }

  const pvgis: { data: {} }[] = [];
  let enedis: { data: {} } = { data: {} };
  for (const lsKey of lsKeys) {
    if (lsKey.toLowerCase().includes("enedis")) {
      enedis = JSON.parse(localStorage.getItem(lsKey) || "{}");
    } else {
      pvgis.push(JSON.parse(localStorage.getItem(lsKey) || "{}"));
    }
  }

  function format(nombre: number) {
    return new Intl.NumberFormat().format(nombre);
  }

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
    const tmp = { name: hour, enedis: 0 };
    pvgis.forEach((value, index) => {
      for (let v in value.data[month]) {
        tmp["value" + index] = value.data[month][hour];
      }
    });
    tmp.enedis = enedis.data[month][hour];
    d.push(tmp);
  });
  const cal = d.map((value: { [index: string]: number }) => {
    let res: { [index: string]: number | string } = {
      hour: value.name,
      enedis: parseFloat(value.enedis.toFixed(2)),
    };
    if (value.value0 !== undefined) {
      res.value0 = parseFloat(value.value0.toFixed(2));
      res.autoconso0 =
        value.value0 >= value.enedis
          ? parseFloat(value.enedis.toFixed(2))
          : parseFloat(value.value0.toFixed(2));
    }
    if (value.value1 !== undefined) {
      res.value1 = parseFloat(value.value1.toFixed(2));
      res.autoconso1 =
        value.value1 >= value.enedis
          ? parseFloat(value.enedis.toFixed(2))
          : parseFloat(value.value1.toFixed(2));
    }
    if (value.value2 !== undefined) {
      res.value2 = parseFloat(value.value2.toFixed(2));
      res.autoconso2 =
        value.value2 >= value.enedis
          ? parseFloat(value.enedis.toFixed(2))
          : parseFloat(value.value2.toFixed(2));
    }
    if (value.value3 !== undefined) {
      res.value3 = parseFloat(value.value3.toFixed(2));
      res.autoconso3 =
        value.value3 >= value.enedis
          ? parseFloat(value.enedis.toFixed(2))
          : parseFloat(value.value3.toFixed(2));
    }
    return res;
  });

  const redu = cal.reduce((previousValue, currentValue) => {
    let res = {
      enedis: previousValue.enedis + currentValue.enedis,
    };
    if (
      previousValue.value0 !== undefined &&
      currentValue.value0 !== undefined
    ) {
      res.value0 = previousValue.value0 + currentValue.value0;
      res.autoconso0 = previousValue.autoconso0 + currentValue.autoconso0;
    }
    if (
      previousValue.value1 !== undefined &&
      currentValue.value1 !== undefined
    ) {
      res.value1 = previousValue.value1 + currentValue.value1;
      res.autoconso1 = previousValue.autoconso1 + currentValue.autoconso1;
    }
    if (
      previousValue.value2 !== undefined &&
      currentValue.value2 !== undefined
    ) {
      res.value2 = previousValue.value2 + currentValue.value2;
      res.autoconso2 = previousValue.autoconso2 + currentValue.autoconso2;
    }
    if (
      previousValue.value3 !== undefined &&
      currentValue.value3 !== undefined
    ) {
      res.value3 = previousValue.value3 + currentValue.value3;
      res.autoconso3 = previousValue.autoconso3 + currentValue.autoconso3;
    }
    // console.log(previousValue, currentValue, res);
    return res;
  });

  return (
    <div>
      {redu.enedis}
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>production</th>
            <th>autoconso</th>
            <th>autonomie</th>
            <th>surplu</th>
            <th>batterie</th>
          </tr>
        </thead>
        <tbody>
          {lsKeys
            .filter((value) => value.startsWith("pvgis"))
            .map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value}</td>
                  <td>{format(redu["value" + index])}</td>
                  <td>
                    {format(
                      (redu["autoconso" + index] / redu["value" + index]) * 100
                    )}
                    %
                  </td>
                  <td>
                    {format((redu["autoconso" + index] / redu.enedis) * 100)}%
                  </td>
                  <td>
                    {format(redu["value" + index] - redu["autoconso" + index])}
                  </td>
                  <td>{format(redu.enedis - redu["autoconso" + index])}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
