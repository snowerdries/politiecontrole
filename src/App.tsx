import * as React from 'react';
import './App.css';
import Feed from './feed/feed';
/// <reference path="../typings/react-tap-event-plugin.d.ts" />
import injectTapEventPlugin = require('react-tap-event-plugin');

class App extends React.Component<{}, null> {
  constructor() {    
    super();
    injectTapEventPlugin();    
  }

  render() {
    return (
      <Feed />
    );
  }
}

export default App;
