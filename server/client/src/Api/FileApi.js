import Path from './Path.js'

const proxy = Path.proxy;

function sendNewFile(projectId, value) {
  return fetch(proxy +'/projects/'+ projectId + '/documents', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value),
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
};

function deleteFile(projectId, value) {
  return fetch(proxy + '/projects/' + projectId + '/documents/' + value, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
};

const FileApi = {
  sendNewFile,
  deleteFile
}
export default FileApi;
