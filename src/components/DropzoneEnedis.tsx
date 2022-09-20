import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "core-js/actual/array/group-by";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import enedis from "../drops/enedis";

export default function DropzoneEnedis({
  setEnedis,
  setEnedisFile,
  enedisFile,
}: {
  setEnedis: Dispatch<SetStateAction<{ data: { [index: string]: any } }>>;
  setEnedisFile: Dispatch<SetStateAction<string>>;
  enedisFile: string;
}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      setEnedisFile("enedis__" + file.name);
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => setEnedis(enedis(reader.result as string));
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
