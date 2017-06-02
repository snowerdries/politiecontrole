import * as React from 'react';
import '../App.css';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {PolitieControleFeedItem} from '../types/politieControleFeedItem';
import * as moment from 'moment';

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
          {
            this.props.feed.map(function(item: PolitieControleFeedItem, index: number){
              const key = 'item' + index;
              return (
                <ListItem 
                  key={key} 
                  primaryText={item.message} 
                  secondaryText={moment(item.created_time).format('DD/MM/YYYY HH:mm')} 
                />
              );    
            })
          }
        </List>      
      </div>
    );
  }
}

export default Feed;
