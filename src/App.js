
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'

import Home from './pages/home'
import Individual from './pages/individual'
import Form from './pages/form'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/individual/:name" component={Individual} />
        <Route exact path="/form" component={Form} />
      </Switch>
    </BrowserRouter>
  )
}


export default App;
