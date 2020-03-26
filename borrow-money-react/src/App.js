import React from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import  RouterConfig from './router/index';
import {HashRouter  } from 'react-router-dom';
import store from './store/index'
import {Provider} from 'react-redux';//添加react-redux依赖，引入改节组件
// import NavBar from './components/NavBar';
// import Page1 from './components/jspang';
// import Page2 from './components/jspangb';
// import Login from './modules/login/login';
import {createBrowserHistory} from 'history'
const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <HashRouter history={history} >
                <RouterConfig/>
            </HashRouter>
        </Provider>

    </div>
  );
}

export default App;
