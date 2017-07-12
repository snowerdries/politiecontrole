import * as React from 'react';
import './App.css';
import {FeedContainer} from './feed/feedContainer';
/// <reference path="../typings/react-tap-event-plugin.d.ts" />
import injectTapEventPlugin = require('react-tap-event-plugin');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import { getPolitieControleFeed } from './feed/feedActions';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { MainReducer }  from './reducers';
import {PolitieControleFeedItem} from './types/politieControleFeedItem';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';

declare const FB: any;

const style = {
  margin: 12,
};

const recentsIcon = <FontIcon className="material-icons">...</FontIcon>;

class App extends React.Component<Props, {token?: string, filter?: string}> {
  onLoginFacebookHandler = this.loginFacebook.bind(this);
  getFeedHandler = this.getFeed.bind(this);
  allConst = 'all';
  refreshConst = 'refresh';

  constructor() {    
    super();
    this.state = {token: ''};
    injectTapEventPlugin();
  }

  componentDidMount() {
    this.checkLoginState();
  }

  menuItemClicked (item: string) {
    if (item === this.refreshConst) {
      if (this.props.getFeed) {
        this.props.getFeed();
      }
      return;
    }
    if (this.props.getFeed) {
        this.props.getFeed('', item === this.allConst ? '' :  item);
    }
  }

  checkLoginState() {
      const self = this;
      FB.init({
              appId: '249544888855622', // PROD
              // appId: '853341981486218', // DEV
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

  getFeed() {    
    if (this.props.getFeed) {
      this.props.getFeed(this.props.next, this.props.filter);
    }
  }

  renderRightMenuItems() {
    const items: Array<string> = [];
    items.push(this.allConst);
    if (this.props.feed) {
      this.props.feed.forEach((feedItem) => {
        if (feedItem.message && feedItem.message.length > 3) {
          const ident = feedItem.message.substr(0, 3).toLowerCase();
          if (items.indexOf(ident) < 0) {
             items.push(ident);
          }
        }
      });
    }
    items.push(this.refreshConst);
    return items.map((item) =>  {
      return <MenuItem onClick={this.menuItemClicked.bind(this, item)} primaryText={item} />;
    });
  }

  renderRightIconButton() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton disabled={!this.state.token}><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >      
        {this.renderRightMenuItems()}
      </IconMenu>
    );
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
            iconElementRight={this.renderRightIconButton()}
          />
          {content}
          <Paper zDepth={1} className="footer">
            <BottomNavigation>
              <BottomNavigationItem
                onTouchTap={this.getFeedHandler}
                icon={recentsIcon}
              />
            </BottomNavigation>
          </Paper>
        </div>        
      </MuiThemeProvider>
    );
  }
}

interface Props {
    getFeed?: (next?: string, filter?: string) => void;
    feed?: Array<PolitieControleFeedItem>;
    next?: string;
    filter?: string;
}

function mapDispatchToProps(dispatch: any, props: Props) {
    let propsval: Props = {
        getFeed: (next?: string, filter?: string) => {
            dispatch(getPolitieControleFeed(next, filter));
        }
    };
    return propsval;   
}

function mapStateToProps(state: MainReducer) {
    let propsval: Props = {
        feed: state.feed && state.feed.data ? state.feed.data  : [],
        next: state.feed && state.feed.next ? state.feed.next : undefined,
        filter: state.feed && state.feed.filter ? state.feed.filter : undefined        
    };
    return propsval;
}

export default App;

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);