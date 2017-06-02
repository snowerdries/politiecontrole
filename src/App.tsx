import * as React from 'react';
import './App.css';
import {FeedContainer} from './feed/feedContainer';
/// <reference path="../typings/react-tap-event-plugin.d.ts" />
import injectTapEventPlugin = require('react-tap-event-plugin');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

declare const FB: any;

const style = {
  margin: 12,
};

class App extends React.Component<{}, {token?: string}> {
  onLoginFacebookHandler = this.loginFacebook.bind(this);

  constructor() {    
    super();
    this.state = {token: ''};
    injectTapEventPlugin();
  }

  componentDidMount() {
    this.checkLoginState();
  }

  checkLoginState() {
      const self = this;
      FB.init({
              appId: '249544888855622',
              // appId: '853341981486218',
              cookie: true,  // enable cookies to allow the server to access the session
              xfbml: true,  // parse social plugins on this page
              version: 'v2.9' // use graph api version 2.9
          });
      FB.AppEvents.logPageView();
      FB.getLoginStatus(function(response: any) {
        if (response.status === 'connected') {
          self.setState({token:   response.authResponse.accessToken});          
        }
      });
  }

  loginFacebook() {
    const self = this;
    FB.login(function(response: any) {
      if (response.authResponse) {
        self.setState({token: response.authResponse.accessToken});
      }
    });
  }

  render() {
    let content = null;
    let styleAppBar = {};
    if (!this.state.token) {
      content = (
        <div>          
          <RaisedButton onClick={this.onLoginFacebookHandler} label="Connect facebook" primary={true} style={style} />
        </div>
      );
    } else {
      styleAppBar = {position: 'fixed'};
      content = (<FeedContainer />);
    }
    return (
      <MuiThemeProvider>
        <div>
          <AppBar 
            style={styleAppBar} 
            title="Politiecontrole" 
            showMenuIconButton={false}
          />
          {content}
        </div>        
      </MuiThemeProvider>
    );
  }
}

export default App;
