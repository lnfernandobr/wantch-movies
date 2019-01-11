import { compose } from "recompose";
import { reduxForm } from "redux-form";
import { withSnackbar } from "notistack";
import { validate } from "../../infra/forms/validate.js";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

export const createUser = compose(
  withSnackbar,
  reduxForm({
    form: "login",
    validate,
    onSubmit: (data, dispatch, { enqueueSnackbar }) => {
      Accounts.createUser(
        {
          email: data.email,
          password: data.password,
          profile: { name: data.name }
        },
        e => {
          if (!e) {
            window.location = "/movie-watch";
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
  reduxForm({
    form: "login",
    validate,
    onSubmit: (data, dispatch, { history, location, enqueueSnackbar }) => {
      Meteor.loginWithPassword(data.email, data.password, e => {
        if (!e) {
          window.location = "/movie-watch";
        }

        if (e.error === 403) {
          enqueueSnackbar("Usuario não encontrado !");
        }
      });
    }
  })
);
