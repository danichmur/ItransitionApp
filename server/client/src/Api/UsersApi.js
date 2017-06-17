import Path from './Path.js'

const proxy = Path.proxy;

function getAllProjectUser(projectId) {
  return fetch(proxy + '/projects/' + projectId + '/users')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
};

function getAllUser() {
  return fetch(proxy + '/users')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
};

function sendNewUsers(projectId, value) {
  var data = {
     users: value.map(user => (user.id)),
  }
  return fetch(proxy + '/projects/' + projectId + '/users/users_on_project', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(data),
  })
  .then(Path.checkStatus);
}
const UsersApi = {
  getAllProjectUser,
  getAllUser,
  sendNewUsers
}
export default UsersApi;
