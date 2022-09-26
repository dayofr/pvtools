import DropzonePvgis from "../components/DropzonePvgis";
import DropzoneEnedis from "../components/DropzoneEnedis";
import Provider from "../components/compare/Provider";
import Dates from "../components/compare/Dates";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function Compare() {
  let dates: CompareDates = {
    start1: { h: 0, m: 0 },
    end1: { h: 0, m: 0 },
    start2: { h: 0, m: 0 },
    end2: { h: 0, m: 0 },
  };
  let provider: Provider = {
    provider: "",
    full: 0,
    low: 0,
    standard: 0,
    aFullLow: 0,
    aStandard: 0,
  };

  function d(d: CompareDates) {
    dates = d;
    calc();
  }
  function p(p: Provider) {
    provider = p;
    calc();
  }

  const lsKeys = [];

  for (let i = 0; i < 10; i++) {
    const tmpKey = localStorage.key(i);
    if (tmpKey !== null && tmpKey !== "") {
      lsKeys.push(tmpKey);
    }
  }

  let pvgis: {
    data: {
      [index: string]: {
        [index: string]: number;
      };
    };
  } = { data: {} };

  let enedis: {
    data: {
      [index: string]: {
        [index: string]: number;
      };
    };
  } = { data: {} };
  for (const lsKey of lsKeys) {
    if (lsKey.toLowerCase().includes("enedis")) {
      enedis = JSON.parse(localStorage.getItem(lsKey) || "{}");
    } else {
      pvgis = JSON.parse(localStorage.getItem(lsKey) || "{}");
    }
  }

  let data = {
    low: 0,
    full: 0,
    enedis: 0,
    pvgis: 0,
  };

  function calc() {
    data = {
      low: 0,
      full: 0,
      enedis: 0,
      pvgis: 0,
    };
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
      let enedisTotal = 0;
      for (const [key, value] of Object.entries(enedis.data)) {
        enedisTotal += value[hour];
      }
      let pvgisTotal = 0;
      for (const [key, value] of Object.entries(pvgis.data)) {
        pvgisTotal += value[hour];
      }
      data.enedis += enedisTotal;
      data.pvgis += pvgisTotal;
      const val = parseFloat(((enedisTotal - pvgisTotal) / 1000).toFixed(2));
      // console.log(hour, enedisTotal, pvgisTotal, val);
      if (val > 0) {
        if (
          (parseInt(hour) > dates?.start1.h &&
            parseInt(hour) < dates?.end1.h) ||
          (parseInt(hour) > dates?.start2.h && parseInt(hour) < dates?.end2.h)
        ) {
          data.low += val;
        } else {
          data.full += val;
        }
      }
    });
    console.log(data);
    console.log(data, dates, provider);
    console.log(
      provider.low * data.low + provider.full * data.full + provider.aFullLow
    );
    console.log(provider.low, data.low + data.full, provider.standard);
    console.log(provider.low * (data.low + data.full) + provider.standard);
  }

  return (
    <div className="App" style={{ padding: "1rem" }}>
      <div id="dropzones">
        <DropzonePvgis />
        <DropzoneEnedis />
      </div>
      <Dates dates={d} />
      <Provider prices={p} />
      <table>
        <thead>
          <tr>
            <th>Fournisseur</th>
            <th>Prix Creuse / Pleine</th>
            <th>Prix Normale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{provider.provider}</td>
            <td>
              {provider.low * data.low +
                provider.full * data.full +
                provider.aFullLow}
            </td>
            <td>{provider.low * (data.low + data.full) + provider.standard}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
