import Path from './Path.js'

const proxy = Path.proxy;

function getAllProjects() {
  return fetch(proxy+'/projects')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
};

function getFewProjects(tagId) {
  return fetch(proxy+'/tags/' + tagId + '/projects')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}
function getFewActiveProjects() {
  return fetch(proxy+'/projects/limit_index')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}
function getOneProject(projectId){
  return fetch(proxy + '/projects/' + projectId)
    .then(Path.checkStatus)
    .then(Path.parseJSON);
};

function updateProject(projectId,value,userId) {
  var data= {
      project: value,
      user_id: userId
  }
  return fetch(proxy + '/projects/' + projectId, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
};
function sendNewProject(data) {
  return fetch(proxy + '/projects', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
};

function deleteProject(projectId) {
  return fetch(proxy + '/projects/' + projectId, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
};

const ProjectApi = {
  updateProject,
  getFewActiveProjects,
  getOneProject,
  getAllProjects,
  getFewProjects,
  deleteProject,
  sendNewProject
}
export default ProjectApi;
