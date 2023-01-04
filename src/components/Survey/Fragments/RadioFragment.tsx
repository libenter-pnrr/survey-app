import React from "react";
import { Grid, Typography, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Add, Delete } from "@mui/icons-material";
import { Controller, FieldErrors, useFieldArray } from "react-hook-form";

type RadioFragmentProps = {
  control: any;
  errors: FieldErrors<any>;
};

const RadioFragment = ({ control, errors }: RadioFragmentProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  console.log(errors);
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Configura le opzioni disponibili</Typography>
          <IconButton onClick={() => append({ value: "", label: "" })}>
            <Add />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {fields.map((e, i) => {
          return (
            <Grid
              container
              key={e.id || i}
              sx={{
                marginBottom: 2,
              }}
            >
              <Grid item xs={5}>
                <Controller
                  name={`options.${i}.value`}
                  control={control}
                  rules={{
                    required: { value: true, message: "Campo Obbligatorio" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      fullWidth
                      label={"Valore campo"}
                      error={
                        errors?.options &&
                        errors?.options[i] &&
                        errors?.options[i].value
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        errors?.options &&
                        errors?.options[i] &&
                        errors?.options[i].value
                          ? errors?.options[i].value.message
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={5}>
                <Controller
                  name={`options.${i}.label`}
                  control={control}
                  rules={{
                    required: { value: true, message: "Campo Obbligatorio" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      label={"Label campo"}
                      error={
                        errors?.options &&
                        errors?.options[i] &&
                        errors?.options[i].label
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        errors?.options &&
                        errors?.options[i] &&
                        errors?.options[i].label
                          ? errors?.options[i].label.message
                          : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    remove(i);
                  }}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default RadioFragment;
