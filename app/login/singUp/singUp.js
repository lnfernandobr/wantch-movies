import React from "react";
import Button from "@material-ui/core/Button";
import { renderInput } from "../../../infra/forms/form";
import { createUser } from "../Container";
import { Field } from "redux-form";

export const SingUp = createUser(({ enqueueSnackbar, ...props }) => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="form-login">
        <h1 className="title-login">Cadastro</h1>

        <Field name="name" type="text" component={renderInput} label="Nome" />

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
          disabled={pristine || submitting}
          variant="contained"
          size="medium"
          color="primary"
        >
          Registrar
        </Button>
      </form>
    </div>
  );
});
