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
  return fetch('http://localhost:3001/projects')
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};
function getOneProject(id,fun){
  return fetch('http://localhost:3001/projects/'+id)
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};
const ApiQueries = { getFewProjects, getOneProject };
export default ApiQueries;
