import React from "react";
import Button from "@material-ui/core/Button";
import { renderInput } from "../../../infra/forms/form";
import { Field } from "redux-form";
import { loginWithPassword } from "../Container";

export const SingIn = loginWithPassword(({ enqueueSnackbar, ...props }) => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-login">
        <h1 className="title-login">Login</h1>

        <Field
          name="email"
          type="email"
          component={renderInput}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderInput}
          label="Senha"
        />

        <Button
          type="submit"
          variant="contained"
          size="medium"
          color="primary"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
});
