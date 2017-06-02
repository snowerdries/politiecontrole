import * as React from 'react';
import './App.css';
import {FeedContainer} from './feed/feedContainer';
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
          <FeedContainer />
        </div>        
      </MuiThemeProvider>
    );
  }
}

export default App;
