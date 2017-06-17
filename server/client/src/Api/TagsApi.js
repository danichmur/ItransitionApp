import Path from './Path.js'

const proxy = Path.proxy;

function getAllTags() {
  return fetch(proxy +'/tags')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
};

function sendNewTags(projectId, value) {
  var data = {
     tags: value.map(tag => tag.value),
  }
  return fetch(proxy+'/projects/'+ projectId + '/tags/tags_on_project', {
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:  JSON.stringify(data),
  })
  .then(Path.checkStatus);
}

const TagsApi = {
  sendNewTags,
  getAllTags
}
export default TagsApi;
