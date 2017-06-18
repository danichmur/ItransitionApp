import Path from './Path.js'

const proxy = Path.proxy;

function getAllNews() {
  return fetch(proxy+'/news')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}
function getFewNews() {
  return fetch(proxy+'/news/limit_index')
    .then(Path.checkStatus)
    .then(Path.parseJSON);
}
const NewsApi = {
  getAllNews,
  getFewNews
}
export default NewsApi;
