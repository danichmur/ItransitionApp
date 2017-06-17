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

function getOneProject(projectId){
  return fetch(proxy + '/projects/' + projectId)
    .then(Path.checkStatus)
    .then(Path.parseJSON)
};

function updateProject(projectId, value) {
  var data= {
      project: value
  }
  return fetch(proxy + '/projects/' + projectId, {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(data),
  })
  .then(Path.checkStatus);
};

const ProjectApi = {
  updateProject,
  getOneProject,
  getAllProjects,
  getFewProjects
}
export default ProjectApi;
