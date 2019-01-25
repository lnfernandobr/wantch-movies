export const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Digite um email valido";
  } else if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Endereço de email invalido";
  }

  if (!values.name) {
    errors.name = "Digite seu nome";
  } else if (values.name.length < 3) {
    errors.name = "Minimo 3 caracteres";
  } else if (values.name.length > 10) {
    errors.name = "Maximo 10 caracteres";
  }

  if (!values.password) {
    errors.password = "Digite sua senha!";
  } else if (values.password.length < 6) {
    errors.password = "Minimo 6 caracteres";
  } else if (values.password.length > 25) {
    errors.password = "Maximo 25 caracteres";
  }

  return errors;
};
