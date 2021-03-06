import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "AppContext";
import { createStore } from "redux";
import rootReducer from "redux/root-reducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension"
import { addAuthHeader } from "apis/axiosConfig";
import { createSetAuthTokenAction, createSetUidAction } from "redux/auth-reducer";

//모든 리듀서들의 상태를 관리(상태 데이터베이스라고 생각), 메소드 사용 가능(state, dispatch)
const store = createStore(rootReducer, composeWithDevTools());

//Redux에 인증 정보 설정
store.dispatch(createSetUidAction(sessionStorage.getItem("uid") || ""));
store.dispatch(createSetAuthTokenAction(sessionStorage.getItem("authToken")));

//axios에 인증 헤더 추가
if(sessionStorage.getItem("authToken")) {
  addAuthHeader(sessionStorage.getItem("authToken"));
}

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
      </Provider>
    </BrowserRouter>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
