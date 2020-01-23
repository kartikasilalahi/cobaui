import React, { Fragment } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
// import Axios from 'axios'
// import { Table, Input, Button } from 'reactstrap';
// import {APIURL, APIIMAGE} from './helper/apiUrl'
// import Modal from './component/modal'
import ManageUsers from './pages/manageuser'
import Register from './pages/register'
import verifikasi from './pages/verified'

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path='/' exact component={ManageUsers} />
        <Route path='/register' exact component={Register}/>
        <Route path='/verified' exact component={verifikasi}/>
      </Switch>
    </Fragment>
  )
}

export default App;
