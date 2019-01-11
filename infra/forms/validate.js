export const validate = values => {
  const errors = {};
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Endereço de email invalido";
  }

  if (!values.password) {
    errors.password = "Digite sua senha!";
  } else if (values.password.length < 6) {
    errors.password = "A Senha precisa ter no minimo 6 caracteres";
  } else if (values.password.length > 25) {
    errors.password = "A Senha precisa ter no maximo 25 caracteres";
  }

  return errors;
};
