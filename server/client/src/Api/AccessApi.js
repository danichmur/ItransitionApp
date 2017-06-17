import Path from './Path.js'

const proxy = Path.proxy;


function login(user) {
  return fetch( proxy + '/sessions', {
    method:'post',
    body:JSON.stringify(user),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}

function logup(user) {
  return fetch(proxy + '/users', {
    method:'post',
    body:JSON.stringify(user),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}

function sendSecretCode(code, email_value) {
  let data = {
    email_code: code,
    email: email_value
  }
  return fetch(proxy + '/users/confirm_email', {
    method:'put',
    body:JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}

function checkSession(token) {
  let data = {
    authentication_token : token
  }
  return fetch(proxy + '/sessions/check', {
    method:'put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}

function logout(user_id) {
  return fetch(proxy + '/sessions/' + user_id, {
    method: 'DELETE',
  })
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}

const AccessApi = {
  login,
  logup,
  sendSecretCode,
  checkSession,
  logout,
}
export default AccessApi;
