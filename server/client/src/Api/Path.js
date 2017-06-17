const proxy = 'http://4716f05b.ngrok.io';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status == 401){
    return response.status;
  }
  consolr.log('error')
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
};

function parseJSON(response) {
  console.log(response,"response")
  if(response == 401) {
    return response;
  }
  return response.json();
};

const Path = {
  proxy,
  checkStatus,
  parseJSON
}
export default Path;
