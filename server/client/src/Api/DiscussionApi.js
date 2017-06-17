import Path from './Path.js'

const proxy = Path.proxy;

function getOneDiscussion(value){
  let path = value.split('/');
  return fetch(proxy +'/projects/' + path[4] + '/discussions/'+ path[2])
    .then(Path.checkStatus)
    .then(parseJSON);
};

function sendNewDiscussion(projectId, value) {
  return fetch(proxy + '/projects/'+ projectId + '/discussions', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value),
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
}

function deleteDiscussion(projectId, value) {
  return fetch(proxy + '/projects/' + projectId + '/discussions/' + value, {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
};

function sendNewComment(discussionsID) {
  return fetch(proxy + '/projects/'+ projectId + '/discussions', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discussionsID),
  })
  .then(Path.checkStatus)
  .then(Path.parseJSON);
}

const DiscussionApi = {
  getOneDiscussion,
  sendNewDiscussion,
  deleteDiscussion,
  sendNewComment
}
export default DiscussionApi;
