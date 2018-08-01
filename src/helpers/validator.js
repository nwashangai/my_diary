const isValidEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

const isValidPassword = (password) => {
  const regex = /^\S*$/;
  return regex.test(String(password));
}

exports.isValidSignUp = (inputs) => {
  if (!inputs.full_name || !isValidEmail(inputs.email) || !isValidPassword(inputs.password) || inputs.full_name.trim() === '' || inputs.password.trim() === '') {
    return false;
  }
  return true;
}

exports.isValidLogin = (inputs) => {
  if (!isValidEmail(inputs.email) || !isValidPassword(inputs.password) || inputs.password.trim() === '') {
    return false;
  }
  return true;
}

exports.isValidEntry = (inputs) => {
  if (!inputs.subject || !inputs.diary || inputs.subject.trim() === '' || inputs.diary.trim() === '') {
    return false;
  }
  return true;
}