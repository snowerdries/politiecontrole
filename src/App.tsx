import * as React from 'react';
import './App.css';
import Feed from './feed/feed';
/// <reference path="../typings/react-tap-event-plugin.d.ts" />
import injectTapEventPlugin = require('react-tap-event-plugin');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class App extends React.Component<{}, null> {
  constructor() {    
    super();
    injectTapEventPlugin();    
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="Politiecontrole" showMenuIconButton={false}/>
          <Feed />
        </div>        
      </MuiThemeProvider>
    );
  }
}

export default App;
