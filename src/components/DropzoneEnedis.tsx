import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import "core-js/actual/array/group-by";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Enedis from "../drops/enedis";

export default function DropzoneEnedis() {
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      setEnedisFile("enedis__" + file.name);
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => setEnedis(Enedis(reader.result as string));
      reader.readAsText(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag n drop your Enedis file here</p>
      </div>
      {enedisFile !== "" && enedisFile !== undefined && (
        <div>
          <ul>
            <li>
              {enedisFile}{" "}
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  localStorage.removeItem(enedisFile);
                  setEnedisFile("");
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
