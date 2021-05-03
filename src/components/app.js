import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import List from './list';
import Lists from './lists';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path="/list/:id" component={List} />
          <Route path="/" component={Lists} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
