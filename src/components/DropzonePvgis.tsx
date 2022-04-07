import React, { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parse } from "papaparse";
import Datapoint from "../Datapoint";
import "core-js/actual/array/group-by";

export default function DropzonePvgis({
  setPvgis,
  setNameFile,
}: {
  setPvgis: Dispatch<SetStateAction<string>>;
  setNameFile: Dispatch<SetStateAction<string>>;
}) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      setNameFile(file.name);

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const json = {
          data: {},
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
        const res = datapoints.groupBy(({ month }: { month: string }) => month);

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

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop your PVGIS file here</p>
    </div>
  );
}
