import React from "react";
import TextField from "@material-ui/core/TextField";

export const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => {
  return (
    <div>
      <label className="control-label">{label}</label>
      <div>
        <TextField
          {...input}
          type={type}
          error={touched && error}
          label={label}
          helperText={touched && error}
          defaultValue={label}
          margin="normal"
        />
      </div>
    </div>
  );
};
