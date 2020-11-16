
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'

import Home from './pages/home'
// import Individual from './pages/individual'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/individual/:name" component={Individual} /> */}
      </Switch>
    </BrowserRouter>
  )
}


export default App;
