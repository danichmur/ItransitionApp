const proxy = 'http://localhost:3005';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status == 401){
    return response.status;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
};

function parseJSON(response) {
  if(response == 401) {
    return response;
  }
  let data = response.json()
  return data;
};

const Path = {
  proxy,
  checkStatus,
  parseJSON
}
export default Path;
