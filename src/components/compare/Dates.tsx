import Grid from "@mui/material/Unstable_Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function Dates({ dates }: { dates: CompareDatesFunction }) {
  const [start1, setStart1] = useState<Dayjs>(
    dayjs("2018-01-01T00:00:00.000Z")
  );
  const [end1, setEnd1] = useState<Dayjs>(dayjs("2018-01-01T00:00:00.000Z"));
  const [start2, setStart2] = useState<Dayjs>(
    dayjs("2018-01-01T00:00:00.000Z")
  );
  const [end2, setEnd2] = useState<Dayjs>(dayjs("2018-01-01T00:00:00.000Z"));

  dates({
    start1: { h: start1.hour(), m: start1.minute() },
    end1: { h: end1.hour(), m: end1.minute() },
    start2: { h: start2.hour(), m: start2.minute() },
    end2: { h: end2.hour(), m: end2.minute() },
  });

  return (
    <>
      <h1>Heure Creuse</h1>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Début"
              value={start1}
              onChange={setStart1}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Fin"
              value={end1}
              onChange={setEnd1}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Début"
              value={start2}
              onChange={setStart2}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid xs={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Fin"
              value={end2}
              onChange={setEnd2}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
}
