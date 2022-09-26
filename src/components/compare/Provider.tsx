import Grid from "@mui/material/Unstable_Grid2";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function Provider({
  prices,
}: {
  prices: CompareProviderFunction;
}) {
  const [provider, setProvider] = useState("Ilek");
  const [full, setFull] = useState("0.1841");
  const [low, setLow] = useState("0.1470");
  const [standard, setStandard] = useState("0.174");
  const [aFullLow, setAFullLow] = useState("35.88");
  const [aStandard, setAStandard] = useState("26.01");

  prices({
    provider,
    full: parseFloat(full),
    low: parseFloat(low),
    standard: parseFloat(standard),
    aFullLow: parseFloat(aFullLow),
    aStandard: parseFloat(aStandard),
  });

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <TextField
          id="standard-basic"
          label="Fournisseur"
          variant="standard"
          value={provider}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setProvider(event.target.value)
          }
        />
      </Grid>
      <Grid xs={6}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1>Tarif kWh</h1>
          </Grid>
          <Grid xs={4}>
            <TextField
              id="standard-basic"
              label="Plein"
              value={full}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFull(event.target.value)
              }
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputProps={{
                inputMode: "numeric",
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              id="standard-basic"
              label="Creuse"
              value={low}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLow(event.target.value)
              }
              InputProps={{
                inputMode: "numeric",
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              id="standard-basic"
              label="Normale"
              value={standard}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setStandard(event.target.value)
              }
              InputProps={{
                inputMode: "numeric",
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={6}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <h1>Tarif Abonnement</h1>
          </Grid>
          <Grid xs={6}>
            <TextField
              id="standard-basic"
              label="Creuse / Pleine"
              value={aFullLow}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAFullLow(event.target.value)
              }
              InputProps={{
                inputMode: "numeric",
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              id="standard-basic"
              label="Normale"
              value={aStandard}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAStandard(event.target.value)
              }
              InputProps={{
                inputMode: "numeric",
                endAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
