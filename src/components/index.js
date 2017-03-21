import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import asyncComponent from './Standalone/AsyncComponent.js'
import Navbar from './Standalone/Navbar.js';
import './../styles';

const Home = asyncComponent(() =>
  import('./Home')
  .then(module => module.default, err => console.log(err))
);
const Toolchain = asyncComponent(() =>
  import('./ToolChain')
  .then(module => module.default, err => console.log(err))
);
const Community = asyncComponent(() =>
  import('./Community')
  .then(module => module.default, err => console.log(err))
);
const Reader = asyncComponent(() =>
  import('./Reader')
  .then(module => module.default, err => console.log(err))
);
const Resources = asyncComponent(() =>
  import('./Resources')
  .then(module => module.default, err => console.log(err))
);

export default function App(props) {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/toolchain" component={Toolchain} />
        <Route path="/community" component={Community} />
        <Route
          exact
          path="/reader/:category/:technology/:name/:section/:content"
          component={Reader}
        />
        <Route
          exact
          path="/reader/:category/:technology/:name/:content"
          component={Reader}
        />
        <Route
          exact
          path="/resources/:category/:technology"
          component={Resources}
        />
      </div>
    </Router>
  );
}
