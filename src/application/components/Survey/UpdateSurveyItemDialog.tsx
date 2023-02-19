import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useSurveyContext from "@contexts/SurveyContext";
import { SET_TO_UPDATE, UPDATE } from "@reducers/Survey/actions";
import RadioCheckboxFragmentProps from "./Fragments/RadioCheckboxFragment";
import SelectFragment from "./Fragments/SelectFragment";

const UpdateSurveyItemDialog = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [surveyItem, setSurveyItem] = React.useState(null);
  const { dispatch, questions, toUpdate } = useSurveyContext();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (toUpdate === null) return;
    const item = questions.find((q) => q.id === toUpdate);
    setSurveyItem(item);
    setValue("title", item?.schema?.title);
    setValue("description", item?.schema?.description);
    setValue("required", item?.required);
    setValue(
      "options",
      (item?.schema?.oneOf &&
        item?.schema?.oneOf.map((e) => ({
          value: e.const,
          label: e.title,
        }))) ||
        []
    );
  }, [toUpdate]);

  const handleCloseDelete = () => {
    dispatch({ type: SET_TO_UPDATE, payload: null });
    setSurveyItem(null);
  };

  const onSubmit = (data) => {
    const item = { ...surveyItem };
    Object.assign(item, {
      required: data.required,
      schema: {
        ...item.schema,
        title: data.title,
        description: data.description,
      },
    });

    if (item.type === "radio" || item.type === "checkbox") {
      item.schema.oneOf = data.options.map((e) => ({
        const: e.value,
        title: e.label,
      }));
    }
    dispatch({ type: UPDATE, payload: item });
  };

  return (
    <Dialog
      open={toUpdate !== null && surveyItem !== null}
      fullScreen={fullScreen}
      onClose={handleCloseDelete}
    >
      {surveyItem !== null && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Aggiorna Elemento</DialogTitle>
          <DialogContent>
            <Grid
              container
              spacing={2}
              sx={{
                marginTop: 2,
              }}
            >
              <Grid item xs={12}>
                <Controller
                  name={"title"}
                  control={control}
                  rules={{
                    required: { value: true, message: "Campo Obbligatorio" },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      name="title"
                      onChange={onChange}
                      value={value}
                      label={"Label campo"}
                      error={Boolean(errors["title"])}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={
                        errors["title"] ? errors["title"].message : null
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={"description"}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      name="description"
                      onChange={onChange}
                      value={value}
                      label={"Descrizione del campo"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      helperText={"Una semplice descrizione del campo"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name="required"
                  defaultValue={false}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <FormControlLabel
                        control={
                          <Switch
                            value={value}
                            onChange={(e, val) => {
                              return onChange(val);
                            }}
                          />
                        }
                        label="Il campo è obbligatorio?"
                      />
                    );
                  }}
                />
              </Grid>
              {["radio", "checkbox"].includes(surveyItem?.type) && (
                <RadioCheckboxFragmentProps control={control} errors={errors} />
              )}
              {["select"].includes(surveyItem?.type) && (
                <SelectFragment control={control} errors={errors} />
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              variant="text"
              onClick={handleCloseDelete}
              color="secondary"
            >
              Annulla
            </Button>
            <Button type="submit" variant="outlined" color="primary">
              Salva
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};

export default UpdateSurveyItemDialog;
