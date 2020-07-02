import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";

function getAllData(URLs){
  return Promise.all(URLs.map(fetchData));
}

function fetchData(URL) {
return new Promise((resolve, reject) => {
  return axios
    .get(URL)
    .then(function(response) {
      resolve(response.data.data)
      debugger;
    })
    .catch(function(error) {
      resolve(error.response);
      debugger;
    });
})
}

function* makeReq(action) {
  try{
  const result = yield getAllData(action.data);
  console.log(result) 
  debugger;
      yield put({ type: "CALL_REQ_SUCCESS", data: result });
    
  } catch(e) {
    debugger
    console.log(e)
    yield put({ type: "CALL_REQ_FAIL"});
    
  }
 
}

export function* watcherSaga() {
  yield takeLatest("CALL_REQ", makeReq);
}
