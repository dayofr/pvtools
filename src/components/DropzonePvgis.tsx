import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "core-js/actual/array/group-by";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import pvgis from "../drops/pvgis";

export default function DropzonePvgis({
  setPvgis,
  setNameFile,
}: {
  setPvgis: Dispatch<SetStateAction<{ data: { [index: string]: any } }>>;
  setNameFile: Dispatch<SetStateAction<string>>;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      setNameFile("pvgis__" + file.name);
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => setPvgis(pvgis(reader.result as string));
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
