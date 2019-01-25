import { compose } from "recompose";
import { reduxForm } from "redux-form";
import { withSnackbar } from "notistack";
import { validate } from "../../infra/forms/validate.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";

export const createUser = compose(
  withRouter,
  withSnackbar,

  reduxForm({
    form: "login",
    validate,
    onSubmit: (data, dispatch, { enqueueSnackbar, history }) => {
      Accounts.createUser(
        {
          email: data.email,
          password: data.password,
          profile: { name: data.name }
        },
        e => {
          if (!e) {
            history.push("/on-high");
            return;
          }

          if (e.error === 403) {
            enqueueSnackbar("Usuario Já existe !");
          }
        }
      );
    }
  })
);

export const loginWithPassword = compose(
  withSnackbar,
  withRouter,

  reduxForm({
    form: "login",
    validate,
    onSubmit: (data, dispatch, { history, enqueueSnackbar }) => {
      Meteor.loginWithPassword(data.email, data.password, e => {
        if (!e) {
          history.push("/on-high");
          return;
        }

        if (e.error === 403) {
          if (e.reason.includes("password")) {
            enqueueSnackbar("Senha Incorreta");
          } else if (e.reason.includes("User not found")) {
            enqueueSnackbar("Usuario Não encontrado");
          }
        } else {
          enqueueSnackbar(e.reason);
        }
      });
    }
  })
);
