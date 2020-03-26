import React from 'react';
import './App.css';
import  RouterConfig from './router/index';
import {HashRouter  } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Page1 from './components/jspang';
// import Page2 from './components/jspangb';
// import Login from './modules/login/login';
import {createBrowserHistory} from 'history'
const history = createBrowserHistory({
  basename: '/test'
});

function App() {
  return (
    <div className="App">
     <HashRouter history={history}>
      <RouterConfig/>
     </HashRouter>
    </div>
  );
}

export default App;
