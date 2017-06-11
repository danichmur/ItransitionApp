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
  return fetch('http://localhost:3001/api/project')
    .then(checkStatus)
    .then(parseJSON)
    .then(fun);
};

const ApiQueries = { getFewProjects };
export default ApiQueries;
