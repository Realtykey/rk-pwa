import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export type ChipItem = { value: string; label: string };

interface ChipsInputProps {
  values: ChipItem[];
  options: ChipItem[];
  onChange: (sectors: ChipItem[]) => void;
}

export default function ChipsInput(props: ChipsInputProps) {
  const classes = useStyles();
  const { values, options, onChange } = props;

  const exists = (item: ChipItem) => {
    return values.some((option) => option.value === item.value);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 auto" }}>
        <FormControlLabel
          style={{ textAlign: "center" }}
          checked={true}
          label="Sectores en los que trabajas"
          labelPlacement="top"
          control={
            <Paper variant="outlined" color="" className={classes.root}>
              {options.map((item, index) => {
                return (
                  <li key={index}>
                    <Chip
                      onClick={() => {
                        if (exists(item)) {
                          onChange(
                            values.filter(
                              (option) => option.value !== item.value
                            )
                          );
                        } else {
                          onChange([...values, item]);
                        }
                      }}
                      variant={exists(item) ? "default" : "outlined"}
                      label={item.label}
                      className={classes.chip}
                    />
                  </li>
                );
              })}
            </Paper>
          }
        />
      </div>
    </div>
  );
}
