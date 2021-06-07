import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';

import List from './list';
import Lists from './lists';
import Header from './header';
import PrivateRoute from './private-route';

function App({ auth0 }) {
  console.log(auth0);

  return (
    <BrowserRouter>
      <div className="container">
        <Header />

        <Switch>
          <PrivateRoute path="/list/:id" component={List} />
          <PrivateRoute path="/" component={Lists} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default withAuth0(App);
