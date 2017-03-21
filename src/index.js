import React from 'react';
import { render } from 'react-dom';
import App from './components';
import runtime from 'offline-plugin/runtime';

runtime.install({
  onUpdateReady: () => runtime.applyUpdate(),
  onUpdated: () => location.reload()
});

render(<App />, document.getElementById('root'));
