import * as React from 'react';
import '../App.css';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export class Feed extends React.Component<{}, null> {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <List>
          <Subheader>Controles</Subheader>
          <ListItem primaryText="Controle 1" />
          <ListItem primaryText="Controle 2" />
          <ListItem primaryText="Controle 3" />
          <ListItem primaryText="Controle 4" />
          <ListItem primaryText="Controle 5" />
        </List>      
      </div>
    );
  }
}

export default Feed;
