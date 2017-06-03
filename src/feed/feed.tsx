import * as React from 'react';
import '../App.css';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {PolitieControleFeedItem} from '../types/politieControleFeedItem';
import * as moment from 'moment';

interface FeedProps {
  feed?: Array<PolitieControleFeedItem>;
  next?: string;
  getFeed?: (next?: string) => void;
}

interface FeedState {

}

export class Feed extends React.Component<FeedProps, FeedState> {
  onScrollHandler = this.facebookLoadNext.bind(this);

  constructor(props: FeedProps) {
    super(props);
    if (this.props.getFeed ) {
      this.props.getFeed();
    }
    window.addEventListener('scroll', this.onScrollHandler);  
  }

 facebookLoadNext() {
     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          // you're at the bottom of the page  
          if (this.props.getFeed) {
            this.props.getFeed(this.props.next);
          }        
          
      }   
 }

 renderItems() {
    let items = null;
    if (this.props.feed) {
      items = this.props.feed.map(function(item: PolitieControleFeedItem, index: number){
      const key = 'item' + index;
      return (
        <ListItem 
          key={key} 
          primaryText={item.message} 
          secondaryText={moment(item.created_time).format('DD/MM/YYYY HH:mm')} 
        />
        );    
      });
    }
    return items;
 }

render() {   
    return (
      <div>
        <List>
          <Subheader>Controles</Subheader>
          {
            this.renderItems()         
          }
        </List>      
      </div>
    );
  }
}

export default Feed;
