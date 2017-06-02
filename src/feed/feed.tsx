import * as React from 'react';
import '../App.css';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {PolitieControleFeedItem} from '../types/politieControleFeedItem';

interface FeedProps {
  feed: Array<PolitieControleFeedItem>;
  getFeed: () => void;
}

interface FeedState {

}

export class Feed extends React.Component<FeedProps, FeedState> {
  constructor(props: FeedProps) {
    super(props);
    this.props.getFeed();
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
