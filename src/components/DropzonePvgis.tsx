import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parse } from "papaparse";
import Datapoint from "../Datapoint";
import "core-js/actual/array/group-by";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DropzonePvgis({
  setPvgis,
  setNameFile,
}: {
  setPvgis: Dispatch<SetStateAction<{ data: { [index: string]: any } }>>;
  setNameFile: Dispatch<SetStateAction<string>>;
}) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      setNameFile("pvgis__" + file.name);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const json = {
          data: {} as { [index: string]: any },
        };
        // Do whatever you want with the file contents
        const datapoints: Datapoint[] = [];
        const binaryStr = reader.result as string;
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
        setPvgis(json);
      };
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  let pvgisFiles: string[] = [];
  for (let i = 0; i < 10; i++) {
    const tmpKey = localStorage.key(i);
    if (
      tmpKey !== null &&
      tmpKey !== "" &&
      !tmpKey.toLowerCase().includes("enedis")
    ) {
      pvgisFiles.push(tmpKey);
    }
  }

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag n drop your PVGIS file here</p>
      </div>
      {pvgisFiles.length > 0 && (
        <div>
          <ul>
            {pvgisFiles.map((name, index) => {
              return (
                <li key={index}>
                  {name}{" "}
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      localStorage.removeItem(name);
                      pvgisFiles = pvgisFiles.filter((value) => value !== name);
                    }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
