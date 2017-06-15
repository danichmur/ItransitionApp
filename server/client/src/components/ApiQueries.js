const proxy = 'http://localhost:4000';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
};

function parseJSON(response) {
  return response.json();

};

function getFewProjects(fun) {
  return fetch(proxy+'/projects')
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};

function getOneProject(id,fun){

  return fetch(proxy + '/projects/'+id)
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};

function getOneDiscussion(id,fun){
  var path = id.split('/');
  return fetch(proxy +'/projects/' + path[4] + '/discussions/'+ path[2])
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};

function getAllProjectUser(id,fun) {
  return fetch(proxy+'/projects/'+id+'/users')
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};

function getAllUser(fun) {
  return fetch(proxy+'/users')
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};

function updateProject(id, value) {
  var data= {
      project: value
  }
  return fetch(proxy+'/projects/'+ id, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(data),
  })
  .then(checkStatus);

}

function login(user) {
  return fetch(proxy+'/projects/'+ id)
    .then(checkStatus)
    .then(parseJSON);
}

function sendNewTags(id, value) {
  var data = {
     tags: value.map(tag => (tag.value)),
  }
  return fetch(proxy+'/projects/'+ id + '/tags/tags_on_project', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(data),
  })
  .then(checkStatus);
}

function sendNewUsers(id, value) {
  var data = {
     users: value.map(user => (user.id)),
  }
  return fetch(proxy+'/projects/'+ id + '/users/users_on_project', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(data),
  })
  .then(checkStatus);
}

function sendNewDiscussion(id, value) {

  return fetch(proxy+'/projects/'+ id + '/discussions/discussions_on_project', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(value),
  })
  .then(checkStatus);
}

function getAllTags(fun) {
  return fetch(proxy+'/tags')
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};

const ApiQueries = {
  getFewProjects,
  getOneProject,
  getOneDiscussion,
  getAllProjectUser,
  getAllUser,
  updateProject,
  sendNewTags,
  getAllTags,
  sendNewUsers,
  sendNewDiscussion,
};
export default ApiQueries;
