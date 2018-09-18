import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

// import Login from './components/login/Login';
import App from './pages/app/App'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
  <Switch>
     {/* <Route path="/login" component={Login}/> */}
     <Route path="/app" component={App}/>
     <Route component={App}/>
  </Switch>
</BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();